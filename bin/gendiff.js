#!/usr/bin/env node
import { program } from 'commander';
import parseFile from '../src/parse.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .action((filepath1, filepath2) => {
    const file1Data = parseFile(filepath1);
    const file2Data = parseFile(filepath2);
    console.log('File 1:', file1Data);
    console.log('File 2:', file2Data);
  });

program.parse(process.argv);
