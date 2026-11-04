# 📊 gh-portfolio-metrics

> **GitHub portfolio metrics dashboard generator — CLI + GitHub Action for portfolio analytics.**

[![CI](https://github.com/hvilleg-dev/gh-portfolio-metrics/actions/workflows/ci.yml/badge.svg)](https://github.com/hvilleg-dev/gh-portfolio-metrics/actions/workflows/ci.yml)
[![CodeQL](https://github.com/hvilleg-dev/gh-portfolio-metrics/actions/workflows/codeql.yml/badge.svg)](https://github.com/hvilleg-dev/gh-portfolio-metrics/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18.0.0-green.svg)](https://nodejs.org/)

`gh-portfolio-metrics` generates beautiful markdown reports of your GitHub portfolio metrics (stars, forks, closed issues, contributions). Use it as a **CLI tool** or **GitHub Action** to automatically update your portfolio documentation.

---

## ⚡ Quick Start

Install globally:

```bash
npm install -g gh-portfolio-metrics
```

Or use directly via `npx`:

```bash
export GITHUB_TOKEN="your-github-token"
npx gh-portfolio-metrics collect $GITHUB_TOKEN --output portfolio.md
npx gh-portfolio-metrics summary $GITHUB_TOKEN
```

---

## 🎯 Key Features

- 📊 **Portfolio Analytics:** Stars, forks, closed issues, contributions
- 📝 **Markdown Generation:** Beautiful reports for README integration
- 🔄 **GitHub Action Ready:** Automate metric collection in CI/CD
- ⚡ **Zero Configuration:** Works out of the box
- 🎨 **Rich Formatting:** Table-based layout with emojis

---

## 📖 Usage Examples

### Collect Metrics to File

```bash
gh-portfolio-metrics collect $GITHUB_TOKEN --output portfolio.md

📊 Collecting portfolio metrics...

✓ Metrics saved to portfolio.md
```

### Display Summary

```bash
gh-portfolio-metrics summary $GITHUB_TOKEN

📈 Portfolio Summary:

Total Stars: 210
Total Forks: 54
Closed Issues: 156
Repositories: 12
```

### As GitHub Action

In your `.github/workflows/metrics.yml`:

```yaml
name: Portfolio Metrics

on:
  schedule:
    - cron: '0 0 * * 0'  # Weekly

jobs:
  metrics:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: hvilleg-dev/gh-portfolio-metrics@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          output-file: portfolio.md
```

---

## 📋 Output Example

```markdown
# 📊 GitHub Portfolio Metrics

**Generated:** November 3, 2026

## Summary
| Metric | Value |
|--------|-------|
| **Total Stars** | 210 ⭐ |
| **Total Forks** | 54 🍴 |
| **Closed Issues** | 156 ✅ |
| **Active Repos** | 12 📦 |

## Repositories

### [ai-commit-craft](https://github.com/hvilleg-dev/ai-commit-craft)
AI-Augmented Conventional Commit Assistant
- ⭐ 45 stars
- 🍴 12 forks
```

---

## 🧪 Testing

```bash
npm test
```

With coverage:

```bash
npm test -- --coverage
```

---

## 📄 License

[MIT](LICENSE) © [Harold Villegas](https://github.com/hvilleg-dev)

## 📞 Contact & Connect

- **GitHub:** [@hvilleg-dev](https://github.com/hvilleg-dev)
- **LinkedIn:** [Harold Villegas](https://www.linkedin.com/in/harold-villegas/)
- **Email:** [hvilleg@gmail.com](mailto:hvilleg@gmail.com)
- **Portfolio:** https://github.com/hvilleg-dev

Questions, feedback, or collaboration ideas? Reach out! ✨

---

**Status:** Production-ready · **Test Coverage:** 80%+ · **Last Updated:** 2026-11-04
