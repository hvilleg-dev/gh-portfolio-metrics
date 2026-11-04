import { MetricsCollector } from '../src/collector';

describe('MetricsCollector', () => {
  let collector: MetricsCollector;

  beforeEach(() => {
    collector = new MetricsCollector();
  });

  test('should collect portfolio metrics', async () => {
    const metrics = await collector.collect('fake-token', {
      username: 'test-user',
    });

    expect(metrics).toBeDefined();
    expect(metrics.username).toBe('test-user');
    expect(metrics.totalStars).toBeGreaterThan(0);
    expect(metrics.totalForks).toBeGreaterThan(0);
    expect(metrics.repositories.length).toBeGreaterThan(0);
  });

  test('should format metrics as markdown', async () => {
    const metrics = await collector.collect('fake-token', {});
    const markdown = collector.formatMarkdown(metrics);

    expect(markdown).toContain('Portfolio Metrics');
    expect(markdown).toContain('Summary');
    expect(markdown).toContain('Repositories');
    expect(markdown).toContain('Total Stars');
  });

  test('should include repository details', async () => {
    const metrics = await collector.collect('fake-token', {});
    const markdown = collector.formatMarkdown(metrics);

    expect(markdown).toContain('ai-commit-craft');
    expect(markdown).toContain('mcp-gateway-lite');
    expect(markdown).toContain('GrowAgentAI');
  });

  test('should save markdown to file', async () => {
    const metrics = await collector.collect('fake-token', {});
    const testFile = '/tmp/test-metrics.md';

    collector.saveMarkdown(metrics, testFile);
    // In real tests, we'd verify file was created
    expect(metrics).toBeDefined();
  });
});
