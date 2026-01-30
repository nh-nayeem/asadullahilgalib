import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth } from '@/lib/admin-auth';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  // Validate admin authentication
  if (!validateAdminAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder');

    if (!folder) {
      return NextResponse.json(
        { error: 'Folder parameter is required' },
        { status: 400 }
      );
    }

    // Validate folder name
    const allowedFolders = ['works', 'artworks', 'photographs', 'images', 'logos'];
    if (!allowedFolders.includes(folder)) {
      return NextResponse.json(
        { error: 'Invalid folder' },
        { status: 400 }
      );
    }

    const publicDir = join(process.cwd(), 'public', folder);
    
    try {
      const files = await readdir(publicDir);
      const fileList = [];

      for (const file of files) {
        // Skip JSON files
        if (file.endsWith('.json')) continue;

        const filePath = join(publicDir, file);
        const stats = await stat(filePath);
        
        // Only include files, not directories
        if (stats.isFile()) {
          fileList.push({
            name: file,
            path: `/${folder}/${file}`,
            size: stats.size,
            type: 'application/octet-stream', // Default type, could be enhanced
            modified: stats.mtime,
          });
        }
      }

      // Sort files by name
      fileList.sort((a, b) => a.name.localeCompare(b.name));

      return NextResponse.json({
        success: true,
        folder,
        files: fileList,
        count: fileList.length,
      });

    } catch (error) {
      // Folder doesn't exist or is empty
      return NextResponse.json({
        success: true,
        folder,
        files: [],
        count: 0,
      });
    }

  } catch (error) {
    console.error('Media files fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media files' },
      { status: 500 }
    );
  }
}
