const BASE_URL = 'https://api.github.com';

async function fetchAllRepos(username, token) {
  const repos = [];
  let page = 1;

  while (true) {
    const url = `${BASE_URL}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&page=${page}`;
    const headers = {
      'Accept': 'application/vnd.github+json',
      'User-Agent': 'gh-portfolio-metrics/1.0'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await fetch(url, { headers });

    if (!res.ok) {
      if (res.status === 404) {
        throw new Error(`GitHub user '${username}' not found.`);
      }
      if (res.status === 403) {
        throw new Error('GitHub API rate limit exceeded. Use --token to authenticate.');
      }
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;

    repos.push(...batch);

    const link = res.headers.get('link') || '';
    if (!link.includes('rel="next"')) break;

    page++;
  }

  return repos.filter(r => !r.fork);
}

async function fetchUser(username, token) {
  const url = `${BASE_URL}/users/${encodeURIComponent(username)}`;
  const headers = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'gh-portfolio-metrics/1.0'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(url, { headers });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

module.exports = { fetchAllRepos, fetchUser };
