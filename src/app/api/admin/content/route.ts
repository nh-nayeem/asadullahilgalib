import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth } from '@/lib/admin-auth';
import { commitToGitHub, getJsonContentFromGitHub } from '@/lib/github-api';
import bundledProfile from '../../../../../public/content/profile.json';

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
    const allowedSections = ['works', 'artworks', 'photographs', 'works-home', 'artworks-home', 'photographs-home', 'shorts-home', 'profile'];
    if (!allowedSections.includes(section)) {
      return NextResponse.json(
        { error: 'Invalid section' },
        { status: 400 }
      );
    }

    // Fetch content from GitHub repository
    const githubResult = await getJsonContentFromGitHub(section);
    // The initial About content is bundled with the application. During local
    // development (or before profile.json reaches the configured GitHub branch),
    // use it instead of presenting an empty editor.
    const content = githubResult.status === 'found'
      ? githubResult.content
      : section === 'profile' ? bundledProfile : [];

    return NextResponse.json({
      success: true,
      section,
      content,
      count: Array.isArray(content) ? content.length : 1,
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

    if (!section || content === null || typeof content !== 'object') {
      return NextResponse.json(
        { error: 'Section and content are required' },
        { status: 400 }
      );
    }

    // Validate section name
    const allowedSections = ['works', 'artworks', 'photographs', 'works-home', 'artworks-home', 'photographs-home', 'shorts-home', 'profile'];
    if (!allowedSections.includes(section)) {
      return NextResponse.json(
        { error: 'Invalid section' },
        { status: 400 }
      );
    }

    if ((section === 'profile' && Array.isArray(content)) || (section !== 'profile' && !Array.isArray(content))) {
      return NextResponse.json(
        { error: section === 'profile' ? 'Profile content must be an object' : 'Section content must be an array' },
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
          count: Array.isArray(content) ? content.length : 1,
          gitError: true,
        }, { status: 500 });
      }
    } catch (githubError) {
      console.error('GitHub API error:', githubError);
      return NextResponse.json({
        success: false,
        message: 'GitHub API error occurred. Please check your GitHub credentials.',
        section,
        count: Array.isArray(content) ? content.length : 1,
        gitError: true,
        error: githubError instanceof Error ? githubError.message : 'Unknown GitHub error',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Content updated successfully',
      section,
      count: Array.isArray(content) ? content.length : 1,
    });

  } catch (error) {
    console.error('Content update error:', error);
    return NextResponse.json(
      { error: 'Failed to update content' },
      { status: 500 }
    );
  }
}
