#!/usr/bin/env node

import { program } from 'commander';
import chalk from 'chalk';
import { MetricsCollector } from './collector';

const collector = new MetricsCollector();

program
  .name('gh-portfolio-metrics')
  .description('GitHub portfolio metrics dashboard generator')
  .version('1.0.0');

program
  .command('collect <token>')
  .description('Collect metrics from GitHub')
  .option('--username <username>', 'GitHub username')
  .option('--output <file>', 'Output file (markdown)')
  .action(async (token: string, options) => {
    try {
      console.log(chalk.cyan.bold('\n📊 Collecting portfolio metrics...\n'));
      const metrics = await collector.collect(token, options);

      if (options.output) {
        collector.saveMarkdown(metrics, options.output);
        console.log(chalk.green(`✓ Metrics saved to ${options.output}\n`));
      } else {
        console.log(chalk.yellow(collector.formatMarkdown(metrics)));
      }
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

program
  .command('summary <token>')
  .description('Display portfolio summary')
  .action(async (token: string) => {
    try {
      const metrics = await collector.collect(token, {});
      console.log(chalk.cyan.bold('\n📈 Portfolio Summary:\n'));
      console.log(chalk.green(`Total Stars: ${metrics.totalStars}`));
      console.log(chalk.green(`Total Forks: ${metrics.totalForks}`));
      console.log(chalk.green(`Closed Issues: ${metrics.closedIssues}`));
      console.log(chalk.green(`Repositories: ${metrics.repositories.length}\n`));
    } catch (error) {
      console.error(chalk.red(`❌ Error: ${(error as Error).message}`));
      process.exit(1);
    }
  });

program.parse();
