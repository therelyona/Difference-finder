import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plainFormatDiff = (diff, path = '') => diff
  .flatMap((node) => {
    const { key, type } = node;
    const hasPath = path === '' ? key : `${path}.${key}`;

    switch (type) {
      case 'deleted':
        return `Property '${hasPath}' was removed`;
      case 'added':
        return `Property '${hasPath}' was added with value: ${stringify(node.value)}`;
      case 'unchanged':
        return null;
      case 'nested':
        return plainFormatDiff(node.children, hasPath);
      case 'changed':
        return `Property '${hasPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  })
  .filter((line) => line !== null)
  .join('\n');

export default plainFormatDiff;
