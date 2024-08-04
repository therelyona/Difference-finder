import stylishFormatDiff from './stylish.js';
import plainFormatDiff from './plain.js';
import jsonFormatDiff from './json.js';

const chooseFormat = (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylishFormatDiff(diff);
    case 'plain':
      return plainFormatDiff(diff);
    case 'json':
      return jsonFormatDiff(diff);
    default:
      throw new Error(`Unknown ${format}.`);
  }
};

export default chooseFormat;
