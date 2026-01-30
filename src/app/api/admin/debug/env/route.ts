import { NextRequest, NextResponse } from 'next/server';
import { validateAdminAuth } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  // Validate admin authentication
  if (!validateAdminAuth(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const env = {
    NODE_ENV: process.env.NODE_ENV,
    hasGitHubToken: !!process.env.GITHUB_TOKEN,
    gitHubTokenLength: process.env.GITHUB_TOKEN?.length,
    gitHubRepo: process.env.GITHUB_REPO,
    gitHubBranch: process.env.GITHUB_BRANCH,
  };

  // Parse repo to check format
  let repoFormat = 'invalid';
  if (env.gitHubRepo) {
    const [owner, repoName] = env.gitHubRepo.split('/');
    repoFormat = (owner && repoName) ? 'valid' : 'invalid';
  }

  return NextResponse.json({
    ...env,
    repoFormat,
    timestamp: new Date().toISOString(),
  });
}
