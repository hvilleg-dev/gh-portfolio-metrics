function analyzeRepos(repos) {
  if (!repos || repos.length === 0) {
    return {
      repoCount: 0,
      totalStars: 0,
      totalForks: 0,
      totalOpenIssues: 0,
      averageStarsPerRepo: 0,
      languageDistribution: {},
      licenseDistribution: {},
      topRepos: [],
      recentlyUpdated: [],
      topicFrequency: {}
    };
  }

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);
  const totalOpenIssues = repos.reduce((sum, r) => sum + (r.open_issues_count || 0), 0);

  const languageDistribution = {};
  for (const repo of repos) {
    const lang = repo.language || 'Unknown';
    languageDistribution[lang] = (languageDistribution[lang] || 0) + 1;
  }

  const licenseDistribution = {};
  for (const repo of repos) {
    const license = repo.license ? repo.license.spdx_id : 'None';
    licenseDistribution[license] = (licenseDistribution[license] || 0) + 1;
  }

  const topicFrequency = {};
  for (const repo of repos) {
    for (const topic of (repo.topics || [])) {
      topicFrequency[topic] = (topicFrequency[topic] || 0) + 1;
    }
  }

  const topRepos = [...repos]
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 10)
    .map(r => ({
      name: r.name,
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      language: r.language || '—',
      description: r.description || '—',
      url: r.html_url
    }));

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const recentlyUpdated = repos
    .filter(r => r.pushed_at && r.pushed_at >= thirtyDaysAgo)
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 10)
    .map(r => ({
      name: r.name,
      pushedAt: r.pushed_at,
      language: r.language || '—'
    }));

  return {
    repoCount: repos.length,
    totalStars,
    totalForks,
    totalOpenIssues,
    averageStarsPerRepo: repos.length > 0 ? +(totalStars / repos.length).toFixed(1) : 0,
    languageDistribution,
    licenseDistribution,
    topRepos,
    recentlyUpdated,
    topicFrequency
  };
}

module.exports = { analyzeRepos };
