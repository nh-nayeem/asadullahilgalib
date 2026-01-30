import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth } from '@/lib/admin-auth';
import { readdir } from 'fs/promises';
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
    const publicDir = join(process.cwd(), 'public');
    const folders = ['works', 'artworks', 'photographs', 'images', 'logos'];
    let totalFiles = 0;

    for (const folder of folders) {
      try {
        const folderPath = join(publicDir, folder);
        const files = await readdir(folderPath);
        
        // Count only files (not directories) and exclude JSON files
        const fileCount = files.filter(file => {
          const filePath = join(folderPath, file);
          // Simple check - we assume all items in these folders are files except JSON files
          return !file.endsWith('.json');
        }).length;
        
        totalFiles += fileCount;
      } catch (error) {
        // Folder might not exist, continue with others
        console.log(`Folder ${folder} not found or not accessible`);
      }
    }

    return NextResponse.json({
      count: totalFiles,
      folders: folders,
    });

  } catch (error) {
    console.error('Media stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media stats' },
      { status: 500 }
    );
  }
}
