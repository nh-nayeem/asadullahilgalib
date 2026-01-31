import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { validateAdminAuth } from '@/lib/admin-auth';
import { commitToGitHub } from '@/lib/github-api';

export async function POST(request: NextRequest) {
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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create folder if it doesn't exist
    const publicDir = join(process.cwd(), 'public', folder);
    try {
      await mkdir(publicDir, { recursive: true });
    } catch (error) {
      // Folder might already exist, ignore error
    }

    // Write file to local storage (development only) and commit to GitHub
    const filePath = join(publicDir, fileName);
    
    if (process.env.NODE_ENV === 'development') {
      // Only write to local filesystem in development
      await writeFile(filePath, buffer);
    } else {
      // In production (Vercel), skip local file writing - filesystem is read-only
      console.log('Skipping local file write in production (read-only filesystem)');
    }

    // Commit and push to GitHub
    if (process.env.NODE_ENV === 'development') {
      // Local development - use local git
      const { execSync } = require('child_process');
      try {
        execSync(`git add public/${folder}/${fileName}`, { cwd: process.cwd() });
        execSync(`git commit -m "Upload ${fileName} to ${folder}"`, { cwd: process.cwd() });
        
        const gitRemote = process.env.GIT_REMOTE || 'origin';
        const gitBranch = process.env.GIT_BRANCH || 'main';
        execSync(`git push ${gitRemote} ${gitBranch}`, { cwd: process.cwd() });
        
      } catch (gitError) {
        console.error('Git operations failed:', gitError);
      }
    } else {
      // Production (Vercel) - use GitHub API
      try {
        console.log('Attempting to commit file to GitHub...');
        console.log('Buffer info:', {
          size: buffer.length,
          type: typeof buffer,
          isArrayBuffer: buffer instanceof ArrayBuffer,
          isBuffer: Buffer.isBuffer(buffer)
        });
        
        // Convert buffer to Base64 properly - ensure clean encoding
        const fileContent = Buffer.from(buffer).toString('base64');
        console.log('Base64 content info:', {
          length: fileContent.length,
          isEmpty: !fileContent,
          first50Chars: fileContent.substring(0, 50)
        });
        
        const success = await commitToGitHub({
          path: `public/${folder}/${fileName}`,
          content: fileContent,
          message: `Upload ${fileName} to ${folder}`,
        });
        
        if (success) {
          console.log('GitHub file commit successful');
        } else {
          console.error('GitHub file commit failed');
          return NextResponse.json({
            success: false,
            message: 'Failed to commit file to GitHub. Please check your GitHub credentials.',
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
    }

    return NextResponse.json({
      success: true,
      message: 'File uploaded successfully',
      path: `/${folder}/${fileName}`,
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
