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

  try {
    // Check if this is a deletion (empty content)
    if (file.content === '') {
      // Get current file SHA for deletion
      let sha: string | undefined;
      try {
        const getFileResponse = await fetch(
          `https://api.github.com/repos/${repo}/contents/${file.path}?ref=${branch}`,
          {
            headers: {
              'Authorization': `token ${token}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          }
        );

        console.log('Get file response status:', getFileResponse.status);

        if (getFileResponse.ok) {
          const fileData = await getFileResponse.json();
          sha = fileData.sha;
          console.log('File SHA found:', sha);
        } else {
          const errorText = await getFileResponse.text();
          console.log('File not found in GitHub, response:', errorText);
          return true;
        }
      } catch (error) {
        console.log('Error getting file from GitHub:', error);
        return true;
      }

      // Delete the file
      const response = await fetch(
        `https://api.github.com/repos/${repo}/contents/${file.path}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: file.message,
            sha,
            branch,
          }),
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
      // Create or update file
      let sha: string | undefined;
      try {
        const getFileResponse = await fetch(
          `https://api.github.com/repos/${repo}/contents/${file.path}?ref=${branch}`,
          {
            headers: {
              'Authorization': `token ${token}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          }
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

      const content = Buffer.from(file.content).toString('base64');
      const body = {
        message: file.message,
        content,
        branch,
        ...(sha && { sha }),
      };

      console.log('Committing to GitHub:', {
        path: file.path,
        hasSha: !!sha,
        contentLength: content.length,
        message: file.message,
      });

      const response = await fetch(
        `https://api.github.com/repos/${repo}/contents/${file.path}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
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
