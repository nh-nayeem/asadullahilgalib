import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth } from '@/lib/admin-auth';
import { commitToGitHub } from '@/lib/github-api';

export async function DELETE(request: NextRequest) {
  // Validate admin authentication
  if (!validateAdminAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { folder, fileName } = await request.json();

    if (!folder || !fileName) {
      return NextResponse.json(
        { error: 'Folder and fileName are required' },
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

    // Validate file name (prevent directory traversal)
    if (fileName.includes('..') || fileName.includes('/') || fileName.includes('\\')) {
      return NextResponse.json(
        { error: 'Invalid file name' },
        { status: 400 }
      );
    }

    // Commit deletion to GitHub
    try {
      const success = await commitToGitHub({
        path: `public/${folder}/${fileName}`,
        content: '', // Empty content for deletion
        message: `Delete ${fileName} from ${folder}`,
      });
      
      if (success) {
        console.log('GitHub file deletion successful');
      } else {
        console.error('GitHub file deletion failed');
        return NextResponse.json({
          success: false,
          message: 'Failed to delete file from GitHub. Please check your GitHub credentials.',
          fileName,
          folder,
          gitError: true,
        }, { status: 500 });
      }
    } catch (githubError) {
      console.error('GitHub API error:', githubError);
      return NextResponse.json({
        success: false,
        message: 'GitHub API error occurred. Please check your GitHub credentials.',
        fileName,
        folder,
        gitError: true,
        error: githubError instanceof Error ? githubError.message : 'Unknown GitHub error',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'File deleted successfully',
      fileName,
      folder,
    });

  } catch (error: any) {
    console.error('File deletion error:', error);
    
    if (error.code === 'ENOENT') {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to delete file' },
      { status: 500 }
    );
  }
}
