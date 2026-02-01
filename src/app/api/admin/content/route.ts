import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth } from '@/lib/admin-auth';
import { commitToGitHub, getJsonContentFromGitHub } from '@/lib/github-api';

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
    const section = searchParams.get('section');

    if (!section) {
      return NextResponse.json(
        { error: 'Section parameter is required' },
        { status: 400 }
      );
    }

    // Validate section name
    const allowedSections = ['works', 'artworks', 'photographs', 'works-home', 'artworks-home', 'photographs-home', 'shorts-home'];
    if (!allowedSections.includes(section)) {
      return NextResponse.json(
        { error: 'Invalid section' },
        { status: 400 }
      );
    }

    // Fetch content from GitHub repository
    const content = await getJsonContentFromGitHub(section);

    return NextResponse.json({
      success: true,
      section,
      content,
      count: content.length,
    });

  } catch (error) {
    console.error('Content fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    );
  }
}

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
    const allowedSections = ['works', 'artworks', 'photographs', 'works-home', 'artworks-home', 'photographs-home', 'shorts-home'];
    if (!allowedSections.includes(section)) {
      return NextResponse.json(
        { error: 'Invalid section' },
        { status: 400 }
      );
    }

    // Commit and push to GitHub
    const jsonContent = JSON.stringify(content, null, 2);
    
    // Handle special case for home sections
    const filePath = section.includes('-home') 
      ? `public/content/${section.replace('-', '_')}.json`
      : `public/content/${section}.json`;
    
    try {
      console.log('Attempting to commit to GitHub...');
      const success = await commitToGitHub({
        path: filePath,
        content: jsonContent,
        message: `Update ${section} content`,
      });
      
      if (success) {
        console.log('GitHub commit successful');
      } else {
        console.error('GitHub commit failed');
        return NextResponse.json({
          success: false,
          message: 'Failed to commit content to GitHub. Please check your GitHub credentials.',
          section,
          count: content.length,
          gitError: true,
        }, { status: 500 });
      }
    } catch (githubError) {
      console.error('GitHub API error:', githubError);
      return NextResponse.json({
        success: false,
        message: 'GitHub API error occurred. Please check your GitHub credentials.',
        section,
        count: content.length,
        gitError: true,
        error: githubError instanceof Error ? githubError.message : 'Unknown GitHub error',
      }, { status: 500 });
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
