export interface GitHubFile {
  path: string;
  content: string;
  message: string;
}

export async function commitToGitHub(file: GitHubFile): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // format: owner/repo
  const branch = process.env.GITHUB_BRANCH || 'main';

  console.log('GitHub API Debug:', {
    hasToken: !!token,
    tokenLength: token?.length,
    repo,
    branch,
    filePath: file.path,
    contentLength: file.content.length,
  });

  if (!token || !repo) {
    console.error('GitHub credentials not configured:', {
      hasToken: !!token,
      hasRepo: !!repo,
    });
    return false;
  }

  // Parse owner and repo from GITHUB_REPO
  const [owner, repoName] = repo.split('/');
  if (!owner || !repoName) {
    console.error('Invalid GITHUB_REPO format. Expected: owner/repo');
    return false;
  }

  const baseUrl = 'https://api.github.com';
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };

  try {
    // Check if this is a deletion (empty content)
    if (file.content === '') {
      // Get current file SHA for deletion
      let sha: string | undefined;
      try {
        const getFileResponse = await fetch(
          `${baseUrl}/repos/${owner}/${repoName}/contents/${file.path}?ref=${branch}`,
          { headers }
        );

        console.log('Get file response status:', getFileResponse.status);

        if (getFileResponse.ok) {
          const fileData = await getFileResponse.json();
          sha = fileData.sha;
          console.log('File SHA found:', sha);
        } else {
          const errorText = await getFileResponse.text();
          console.log('File not found in GitHub, response:', errorText);
          return true; // File doesn't exist, nothing to delete
        }
      } catch (error) {
        console.log('Error getting file from GitHub:', error);
        return true; // File doesn't exist, nothing to delete
      }

      // Delete the file using official GitHub API format
      const deleteBody = {
        message: file.message,
        sha,
        branch,
        committer: {
          name: 'Admin Panel',
          email: 'admin@asadullahilgalib.com',
        },
      };

      console.log('Deleting file with body:', { ...deleteBody, sha: '[SHA]' });

      const response = await fetch(
        `${baseUrl}/repos/${owner}/${repoName}/contents/${file.path}`,
        {
          method: 'DELETE',
          headers,
          body: JSON.stringify(deleteBody),
        }
      );

      console.log('Delete response status:', response.status);

      if (response.ok) {
        console.log(`Successfully deleted ${file.path} from GitHub`);
        return true;
      } else {
        const errorData = await response.json();
        console.error('GitHub API delete error:', errorData);
        return false;
      }
    } else {
      // Create or update file using official GitHub API format
      let sha: string | undefined;
      try {
        const getFileResponse = await fetch(
          `${baseUrl}/repos/${owner}/${repoName}/contents/${file.path}?ref=${branch}`,
          { headers }
        );

        console.log('Get existing file response status:', getFileResponse.status);

        if (getFileResponse.ok) {
          const fileData = await getFileResponse.json();
          sha = fileData.sha;
          console.log('Existing file SHA found:', sha);
        } else {
          const errorText = await getFileResponse.text();
          console.log('File does not exist in GitHub:', errorText);
        }
      } catch (error) {
        console.log('Error checking existing file:', error);
        // File doesn't exist, that's okay
      }

      // Encode content to base64
      const content = Buffer.from(file.content, 'utf8').toString('base64');
      const body = {
        message: file.message,
        content,
        branch,
        committer: {
          name: 'Admin Panel',
          email: 'admin@asadullahilgalib.com',
        },
        ...(sha && { sha }),
      };

      console.log('Committing to GitHub:', {
        path: file.path,
        hasSha: !!sha,
        contentLength: content.length,
        message: file.message,
        body: { ...body, content: '[BASE64_CONTENT]', sha: sha ? '[SHA]' : undefined },
      });

      const response = await fetch(
        `${baseUrl}/repos/${owner}/${repoName}/contents/${file.path}`,
        {
          method: 'PUT',
          headers,
          body: JSON.stringify(body),
        }
      );

      console.log('Commit response status:', response.status);

      if (response.ok) {
        console.log(`Successfully committed ${file.path} to GitHub`);
        return true;
      } else {
        const errorData = await response.json();
        console.error('GitHub API commit error:', errorData);
        return false;
      }
    }
  } catch (error) {
    console.error('Error committing to GitHub:', error);
    return false;
  }
}
