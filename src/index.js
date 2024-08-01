import { readFileSync } from 'fs';
import path from 'path';
import makeAbsolutePath from './utils/path.js';
import getParse from './parsers.js';
import findDifferences from './differences.js';
import formatDiff from './utils/stylish.js';

const getDiff = (filePath1, filePath2, format = 'stylish') => {
  const path1 = makeAbsolutePath(filePath1);
  const path2 = makeAbsolutePath(filePath2);

  const content1 = readFileSync(path1, 'utf-8');
  const content2 = readFileSync(path2, 'utf-8');

  const extension1 = path.extname(path1);
  const extension2 = path.extname(path2);

  const parsed1 = getParse(content1, extension1);
  const parsed2 = getParse(content2, extension2);

  const differences = findDifferences(parsed1, parsed2);
  const diff = formatDiff(differences);

  return diff;
};

export default getDiff;
