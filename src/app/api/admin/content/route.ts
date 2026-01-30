import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
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
    const { section, content } = await request.json();

    if (!section || !Array.isArray(content)) {
      return NextResponse.json(
        { error: 'Section and content array are required' },
        { status: 400 }
      );
    }

    // Validate section name
    const allowedSections = ['works', 'artworks', 'photographs'];
    if (!allowedSections.includes(section)) {
      return NextResponse.json(
        { error: 'Invalid section' },
        { status: 400 }
      );
    }

    // Write content to local storage and commit to GitHub
    const filePath = join(process.cwd(), 'public', section, `${section}.json`);
    const jsonContent = JSON.stringify(content, null, 2);
    await writeFile(filePath, jsonContent, 'utf8');

    // Commit and push to GitHub
    if (process.env.NODE_ENV === 'development') {
      // Local development - use local git
      const { execSync } = require('child_process');
      try {
        execSync(`git add public/${section}/${section}.json`, { cwd: process.cwd() });
        execSync(`git commit -m "Update ${section} content"`, { cwd: process.cwd() });
        
        const gitRemote = process.env.GIT_REMOTE || 'origin';
        const gitBranch = process.env.GIT_BRANCH || 'main';
        execSync(`git push ${gitRemote} ${gitBranch}`, { cwd: process.cwd() });
        
      } catch (gitError) {
        console.error('Git operations failed:', gitError);
      }
    } else {
      // Production (Vercel) - use GitHub API
      try {
        console.log('Attempting to commit to GitHub...');
        const success = await commitToGitHub({
          path: `public/${section}/${section}.json`,
          content: jsonContent,
          message: `Update ${section} content`,
        });
        
        if (success) {
          console.log('GitHub commit successful');
        } else {
          console.error('GitHub commit failed, but content was saved locally');
          return NextResponse.json({
            success: false,
            message: 'Content saved locally but failed to commit to GitHub. Please check your GitHub credentials.',
            section,
            count: content.length,
            gitError: true,
          }, { status: 500 });
        }
      } catch (githubError) {
        console.error('GitHub API error:', githubError);
        return NextResponse.json({
          success: false,
          message: 'Content saved locally but GitHub API error occurred. Please check your GitHub credentials.',
          section,
          count: content.length,
          gitError: true,
          error: githubError instanceof Error ? githubError.message : 'Unknown GitHub error',
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Content updated successfully',
      section,
      count: content.length,
    });

  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
