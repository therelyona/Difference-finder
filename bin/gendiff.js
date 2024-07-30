#!/usr/bin/env node
import { program } from 'commander';
import getDiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filePath1, filePath2) => {
    const result = getDiff(filePath1, filePath2);
    console.log(result);
  });

program.parse(process.argv);
