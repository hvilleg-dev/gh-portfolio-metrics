# Contributing to gh-portfolio-metrics

## Development Setup

```bash
git clone https://github.com/hvilleg-dev/gh-portfolio-metrics.git
cd gh-portfolio-metrics
npm install
npm run dev collect $GITHUB_TOKEN
```

## Making Changes

1. Create a feature branch: `git checkout -b feature/new-metric`
2. Add tests for all new metrics
3. Ensure tests pass: `npm test`
4. Maintain 80%+ coverage
5. Commit with convention: `git commit -m "feat: add new metric"`
6. Push and create PR

## Testing Requirements

- All new features must have unit tests
- Coverage must remain above 80%
- Integration tests for GitHub API interactions

## Code Guidelines

- Use TypeScript strict mode
- Follow ESLint configuration
- Add JSDoc comments for public APIs
- Keep functions focused and small
