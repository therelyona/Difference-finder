import _ from 'lodash';

const getPropertyValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plainFormatDiff = (diff, path = '') => diff
  .filter((node) => node.type !== 'unchanged')
  .flatMap((node) => {
    const {
      key, value, firstValue, secondValue, type, children,
    } = node;
    const hasPath = path === '' ? key : `${path}.${key}`;

    switch (type) {
      case 'nested':
        return plainFormatDiff(children, hasPath);
      case 'changed':
        return `Property '${hasPath}' was updated. From ${getPropertyValue(firstValue)} to ${getPropertyValue(secondValue)}`;
      case 'deleted':
        return `Property '${hasPath}' was removed`;
      case 'added':
        return `Property '${hasPath}' was added with value: ${getPropertyValue(value)}`;
      default:
        throw new Error(`Unknown node type: ${type}`);
    }
  })
  .join('\n');

export default plainFormatDiff;
