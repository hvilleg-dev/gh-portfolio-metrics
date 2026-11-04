import fs from 'fs';
import path from 'path';

export interface Repository {
  name: string;
  url: string;
  stars: number;
  forks: number;
  description?: string;
}

export interface PortfolioMetrics {
  username: string;
  totalStars: number;
  totalForks: number;
  closedIssues: number;
  repositories: Repository[];
  generatedAt: string;
}

export class MetricsCollector {
  async collect(token: string, options: any): Promise<PortfolioMetrics> {
    // Mock GitHub API collection
    const mockRepositories: Repository[] = [
      {
        name: 'ai-commit-craft',
        url: 'https://github.com/hvilleg-dev/ai-commit-craft',
        stars: 45,
        forks: 12,
        description: 'AI-Augmented Conventional Commit Assistant',
      },
      {
        name: 'mcp-gateway-lite',
        url: 'https://github.com/hvilleg-dev/mcp-gateway-lite',
        stars: 38,
        forks: 8,
        description: 'Lightweight MCP Gateway Router',
      },
      {
        name: 'GrowAgentAI',
        url: 'https://github.com/hvilleg-dev/GrowAgentAI',
        stars: 127,
        forks: 34,
        description: 'Autonomous Growth & Coaching Architecture',
      },
    ];

    const metrics: PortfolioMetrics = {
      username: options.username || 'hvilleg-dev',
      totalStars: mockRepositories.reduce((sum, r) => sum + r.stars, 0),
      totalForks: mockRepositories.reduce((sum, r) => sum + r.forks, 0),
      closedIssues: 156,
      repositories: mockRepositories,
      generatedAt: new Date().toISOString(),
    };

    return metrics;
  }

  formatMarkdown(metrics: PortfolioMetrics): string {
    let md = `# 📊 GitHub Portfolio Metrics\n\n`;
    md += `**Generated:** ${new Date(metrics.generatedAt).toLocaleDateString()}\n\n`;

    md += `## Summary\n`;
    md += `| Metric | Value |\n`;
    md += `|--------|-------|\n`;
    md += `| **Total Stars** | ${metrics.totalStars} ⭐ |\n`;
    md += `| **Total Forks** | ${metrics.totalForks} 🍴 |\n`;
    md += `| **Closed Issues** | ${metrics.closedIssues} ✅ |\n`;
    md += `| **Active Repos** | ${metrics.repositories.length} 📦 |\n\n`;

    md += `## Repositories\n\n`;
    metrics.repositories.forEach(repo => {
      md += `### [${repo.name}](${repo.url})\n`;
      md += `${repo.description || 'N/A'}\n`;
      md += `- ⭐ ${repo.stars} stars\n`;
      md += `- 🍴 ${repo.forks} forks\n\n`;
    });

    return md;
  }

  saveMarkdown(metrics: PortfolioMetrics, filePath: string): void {
    const markdown = this.formatMarkdown(metrics);
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, markdown, 'utf8');
  }
}
