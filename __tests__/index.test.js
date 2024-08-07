import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import getDiff from '../src/index.js';
import getParse from '../src/parsers.js';
import formatNode from '../src/formatters/stylish.js';
import plainFormatDiff from '../src/formatters/plain.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

test.each([
  ['file1.json', 'file2.json', 'resultStylish.txt', undefined],
  ['file1.yml', 'file2.yml', 'resultStylish.txt', undefined],
  ['file1.json', 'file2.json', 'resultPlain.txt', 'plain'],
  ['file1.json', 'file2.json', 'resultJson.txt', 'json'],
])('getDiff with %s and %s, format - %s', (file1, file2, resultFile, format) => {
  const filePath1 = getFixturePath(file1);
  const filePath2 = getFixturePath(file2);
  const expectedOutput = readFixtureFile(resultFile);

  expect(getDiff(filePath1, filePath2, format)).toEqual(expectedOutput);
});

test('Unsupported file format', () => {
  const file = getFixturePath('resultStylish.txt');
  const content = readFileSync(file, 'utf-8');
  const extension = path.extname(file);

  expect(() => getParse(content, extension)).toThrow();
});

test('Unknown node type, stylish format', () => {
  const invalidNode = [{
    key: 'someKey',
    type: 'unknownType',
  }];

  expect(() => formatNode(invalidNode, 1)).toThrow('Unknown node type: unknownType');
});

test('Unknown node type, plain format', () => {
  const invalidNode = [{
    key: 'someKey',
    type: 'unknownType',
  }];

  expect(() => plainFormatDiff(invalidNode, 1)).toThrow('Unknown node type: unknownType');
});
