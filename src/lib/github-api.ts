export interface GitHubFile {
  path: string;
  content: string;
  message: string;
}

export interface GitHubRepoFile {
  name: string;
  path: string;
  type: string;
  size: number;
  download_url: string;
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

      // Content is already base64
      let content = file.content;
      
      console.log('Content validation:', {
        contentLength: content.length,
        isEmpty: !content,
        isString: typeof content === 'string',
        containsInvalidChars: /[^A-Za-z0-9+/=]/.test(content),
        endsWithEquals: content.endsWith('='),
        first20Chars: content.substring(0, 20),
        last20Chars: content.substring(content.length - 20)
      });
      
      // Ensure content is properly Base64 encoded
      if (typeof content !== 'string' || /[^A-Za-z0-9+/=]/.test(content)) {
        console.log('Invalid Base64 detected, attempting to fix...');
        try {
          // Try to convert from buffer if it's not a string
          if (Buffer.isBuffer(content)) {
            content = content.toString('base64');
          } else {
            // Last resort - convert to string then to base64
            content = Buffer.from(String(content)).toString('base64');
          }
          console.log('Fixed Base64 content length:', content.length);
        } catch (error) {
          console.error('Failed to fix Base64 encoding:', error);
          return false;
        }
      }

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

export async function renameOnGitHub(oldPath: string, newPath: string, message: string): Promise<boolean> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // format: owner/repo
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !repo) {
    console.error('GitHub credentials not configured');
    return false;
  }

  const [owner, repoName] = repo.split('/');
  if (!owner || !repoName) {
    console.error('Invalid GITHUB_REPO format. Expected: owner/repo');
    return false;
  }

  const baseUrl = `https://api.github.com/repos/${owner}/${repoName}`;
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };

  try {
    // Get the existing file's blob SHA so the content is reused, not re-uploaded
    const fileResponse = await fetch(`${baseUrl}/contents/${oldPath}?ref=${branch}`, { headers });
    if (!fileResponse.ok) {
      console.error('File to rename not found in GitHub:', oldPath);
      return false;
    }
    const { sha: blobSha } = await fileResponse.json();

    // Get the latest commit on the branch
    const refResponse = await fetch(`${baseUrl}/git/ref/heads/${branch}`, { headers });
    if (!refResponse.ok) {
      console.error('Failed to get branch ref:', await refResponse.text());
      return false;
    }
    const { object: { sha: parentSha } } = await refResponse.json();

    const commitResponse = await fetch(`${baseUrl}/git/commits/${parentSha}`, { headers });
    if (!commitResponse.ok) {
      console.error('Failed to get parent commit:', await commitResponse.text());
      return false;
    }
    const { tree: { sha: baseTreeSha } } = await commitResponse.json();

    // New tree: add the blob at the new path and remove it from the old path
    const treeResponse = await fetch(`${baseUrl}/git/trees`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        base_tree: baseTreeSha,
        tree: [
          { path: newPath, mode: '100644', type: 'blob', sha: blobSha },
          { path: oldPath, mode: '100644', type: 'blob', sha: null },
        ],
      }),
    });
    if (!treeResponse.ok) {
      console.error('Failed to create tree:', await treeResponse.text());
      return false;
    }
    const { sha: treeSha } = await treeResponse.json();

    const newCommitResponse = await fetch(`${baseUrl}/git/commits`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        message,
        tree: treeSha,
        parents: [parentSha],
        committer: {
          name: 'Admin Panel',
          email: 'admin@asadullahilgalib.com',
        },
      }),
    });
    if (!newCommitResponse.ok) {
      console.error('Failed to create commit:', await newCommitResponse.text());
      return false;
    }
    const { sha: newCommitSha } = await newCommitResponse.json();

    const updateRefResponse = await fetch(`${baseUrl}/git/refs/heads/${branch}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify({ sha: newCommitSha }),
    });
    if (!updateRefResponse.ok) {
      console.error('Failed to update branch ref:', await updateRefResponse.text());
      return false;
    }

    console.log(`Successfully renamed ${oldPath} to ${newPath} on GitHub`);
    return true;
  } catch (error) {
    console.error('Error renaming file on GitHub:', error);
    return false;
  }
}

export async function getFilesFromGitHub(folder: string): Promise<GitHubRepoFile[]> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // format: owner/repo
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !repo) {
    console.error('GitHub credentials not configured');
    return [];
  }

  const [owner, repoName] = repo.split('/');
  if (!owner || !repoName) {
    console.error('Invalid GITHUB_REPO format. Expected: owner/repo');
    return [];
  }

  const baseUrl = 'https://api.github.com';
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  try {
    const response = await fetch(
      `${baseUrl}/repos/${owner}/${repoName}/contents/public/${folder}?ref=${branch}`,
      { headers }
    );

    if (!response.ok) {
      console.log(`Folder ${folder} not found or not accessible in GitHub`);
      return [];
    }

    const files: GitHubRepoFile[] = await response.json();
    
    // Return all files, including JSON files
    return files.filter(file => file.type === 'file');

  } catch (error) {
    console.error(`Error fetching files from GitHub for folder ${folder}:`, error);
    return [];
  }
}

export type JsonContentResult =
  | { status: 'found'; content: unknown }
  | { status: 'missing' };

export async function getJsonContentFromGitHub(section: string): Promise<JsonContentResult> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO; // format: owner/repo
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!token || !repo) {
    throw new Error('GitHub credentials are not configured');
  }

  const [owner, repoName] = repo.split('/');
  if (!owner || !repoName) {
    throw new Error('Invalid GITHUB_REPO format. Expected: owner/repo');
  }

  const baseUrl = 'https://api.github.com';
  const headers = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };

  // Handle special case for home sections
  const filePath = section.includes('-home') 
    ? `public/content/${section.replace('-', '_')}.json`
    : `public/content/${section}.json`;

  try {
    const response = await fetch(
      `${baseUrl}/repos/${owner}/${repoName}/contents/${filePath}?ref=${branch}`,
      { headers }
    );

    if (response.status === 404) {
      console.log(`JSON content for ${section} not found in GitHub at path: ${filePath}`);
      return { status: 'missing' };
    }

    if (!response.ok) {
      throw new Error(`GitHub returned ${response.status} while loading ${filePath}`);
    }

    const fileData = await response.json();
    
    if (fileData.content) {
      // Decode base64 content
      const content = Buffer.from(fileData.content, 'base64').toString('utf8');
      return { status: 'found', content: JSON.parse(content) };
    }

    throw new Error(`GitHub response for ${filePath} did not contain file content`);

  } catch (error) {
    console.error(`Error fetching JSON content from GitHub for section ${section}:`, error);
    throw error;
  }
}
