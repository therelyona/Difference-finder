import yaml from 'js-yaml';

const getParse = (content, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
      return yaml.load(content);
    default:
      throw new Error(`Unsupported file format: ${extension}`);
  }
};

export default getParse;
