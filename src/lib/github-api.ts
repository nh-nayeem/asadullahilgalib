export interface GitHubFile {
  path: string;
  content: string;
  message: string;
}

export async function commitToGitHub(file: GitHubFile): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // format: owner/repo
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !repo) {
    console.log('GitHub credentials not configured');
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

        if (getFileResponse.ok) {
          const fileData = await getFileResponse.json();
          sha = fileData.sha;
        } else {
          console.log('File not found in GitHub, nothing to delete');
          return true;
        }
      } catch (error) {
        console.log('File not found in GitHub, nothing to delete');
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

      if (response.ok) {
        console.log(`Successfully deleted ${file.path} from GitHub`);
        return true;
      } else {
        const errorData = await response.json();
        console.error('GitHub API error:', errorData);
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

        if (getFileResponse.ok) {
          const fileData = await getFileResponse.json();
          sha = fileData.sha;
        }
      } catch (error) {
        // File doesn't exist, that's okay
      }

      const content = Buffer.from(file.content).toString('base64');
      const body = {
        message: file.message,
        content,
        branch,
        ...(sha && { sha }),
      };

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

      if (response.ok) {
        console.log(`Successfully committed ${file.path} to GitHub`);
        return true;
      } else {
        const errorData = await response.json();
        console.error('GitHub API error:', errorData);
        return false;
      }
    }
  } catch (error) {
    console.error('Error committing to GitHub:', error);
    return false;
  }
}
