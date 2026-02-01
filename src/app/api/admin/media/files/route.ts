import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth } from '@/lib/admin-auth';
import { commitToGitHub, getFilesFromGitHub } from '@/lib/github-api';

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

    // Fetch files from GitHub repository (including JSON files)
    const githubFiles = await getFilesFromGitHub(folder);
    
    // Transform GitHub file format to match expected response format and filter out JSON files
    const fileList = githubFiles
      .filter(file => !file.name.endsWith('.json'))
      .map(file => ({
        name: file.name,
        path: `/${folder}/${file.name}`,
        size: file.size,
        type: 'application/octet-stream',
        modified: new Date(), // GitHub doesn't provide modification date in contents API
      }));

    // Sort files by name
    fileList.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({
      success: true,
      folder,
      files: fileList,
      count: fileList.length,
    });

  } catch (error) {
    console.error('Media files fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media files' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  // Validate admin authentication
  if (!validateAdminAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;
    const fileName = formData.get('fileName') as string;

    if (!file || !folder || !fileName) {
      return NextResponse.json(
        { error: 'File, folder, and fileName are required' },
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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Commit and push to GitHub
    try {
      console.log('Attempting to update file in GitHub...');
      const fileContent = buffer.toString('base64');
      const success = await commitToGitHub({
        path: `public/${folder}/${fileName}`,
        content: fileContent,
        message: `Update ${fileName} in ${folder}`,
      });
      
      if (success) {
        console.log('GitHub file update successful');
      } else {
        console.error('GitHub file update failed');
        return NextResponse.json({
          success: false,
          message: 'Failed to update file in GitHub. Please check your GitHub credentials.',
          path: `/${folder}/${fileName}`,
          gitError: true,
        }, { status: 500 });
      }
    } catch (githubError) {
      console.error('GitHub API error:', githubError);
      return NextResponse.json({
        success: false,
        message: 'GitHub API error occurred. Please check your GitHub credentials.',
        path: `/${folder}/${fileName}`,
        gitError: true,
        error: githubError instanceof Error ? githubError.message : 'Unknown GitHub error',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'File updated successfully',
      path: `/${folder}/${fileName}`,
    });

  } catch (error) {
    console.error('File update error:', error);
    return NextResponse.json(
      { error: 'Failed to update file' },
      { status: 500 }
    );
  }
}
