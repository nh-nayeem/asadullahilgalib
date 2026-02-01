import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth } from '@/lib/admin-auth';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { getFilesFromGitHub } from '@/lib/github-api';

export async function GET(request: NextRequest) {
  // Validate admin authentication
  if (!validateAdminAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const folders = ['works', 'artworks', 'photographs', 'images', 'logos'];
    let totalFiles = 0;

    for (const folder of folders) {
      try {
        const files = await getFilesFromGitHub(folder);
        // Filter out JSON files for the count
        const nonJsonFiles = files.filter(file => !file.name.endsWith('.json'));
        totalFiles += nonJsonFiles.length;
      } catch (error) {
        // Folder might not exist or not be accessible, continue with others
        console.log(`Folder ${folder} not found or not accessible in GitHub`);
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
