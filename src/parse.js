const getParse = (content, extension) => {
  if (extension === '.json') {
    return JSON.parse(content);
  }

  throw new Error(`Unsupported file format: ${extension}`);
};

export default getParse;
