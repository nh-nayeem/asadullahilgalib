import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth } from '@/lib/admin-auth';
import { renameOnGitHub } from '@/lib/github-api';

export async function POST(request: NextRequest) {
  // Validate admin authentication
  if (!validateAdminAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { folder, oldFileName, newFileName } = await request.json();

    if (!folder || !oldFileName || !newFileName) {
      return NextResponse.json(
        { error: 'Folder, oldFileName, and newFileName are required' },
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

    // Validate file names (prevent directory traversal)
    for (const name of [oldFileName, newFileName]) {
      if (name.includes('..') || name.includes('/') || name.includes('\\')) {
        return NextResponse.json(
          { error: 'Invalid file name' },
          { status: 400 }
        );
      }
    }

    if (oldFileName === newFileName) {
      return NextResponse.json({
        success: true,
        message: 'File name unchanged',
        path: `/${folder}/${newFileName}`,
      });
    }

    const success = await renameOnGitHub(
      `public/${folder}/${oldFileName}`,
      `public/${folder}/${newFileName}`,
      `Rename ${oldFileName} to ${newFileName} in ${folder}`,
    );

    if (!success) {
      return NextResponse.json({
        success: false,
        message: 'Failed to rename file on GitHub. Please check your GitHub credentials.',
        gitError: true,
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'File renamed successfully',
      path: `/${folder}/${newFileName}`,
    });

  } catch (error) {
    console.error('File rename error:', error);
    return NextResponse.json(
      { error: 'Failed to rename file' },
      { status: 500 }
    );
  }
}
