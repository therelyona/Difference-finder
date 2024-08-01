import { fileURLToPath } from 'url';
import path from 'path';
import { readFileSync } from 'fs';
import getDiff from '../src/index.js';
import getParse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8').trim();

test('getDiff with JSON files', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expectedOutput = readFixtureFile('result.txt');

  expect(getDiff(file1, file2)).toBe(expectedOutput);
});

test('getDiff with YML files', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  const expectedOutput = readFixtureFile('result.txt');

  expect(getDiff(file1, file2)).toBe(expectedOutput);
});

test('Unsupported file format', () => {
  const file = getFixturePath('result.txt');
  const content = readFileSync(file, 'utf-8');
  const extension = path.extname(file);

  expect(() => getParse(content, extension)).toThrow();
});
