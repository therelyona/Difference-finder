import _ from 'lodash';

const indentSize = 4;
const reducedIndentSize = 2;

const indent = (depth, extraIndent = 0) => ' '.repeat(depth * indentSize - extraIndent);

const stringify = (value, depth) => {
  const iter = (currentValue, depthLevel) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }
    const currentIndent = indent(depthLevel + 1);
    const bracketIndent = indent(depthLevel);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, depthLevel + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, depth);
};

const formatNode = (node, depth) => {
  const {
    key, value, firstValue, secondValue, type, children,
  } = node;
  const hasChildren = children ? children.map((child) => formatNode(child, depth + 1)).join('\n') : '';
  const nodeIndent = indent(depth);
  const lineIndent = indent(depth, reducedIndentSize);

  switch (type) {
    case 'nested':
      return `${nodeIndent}${key}: {\n${hasChildren}\n${nodeIndent}}`;
    case 'unchanged':
      return `${nodeIndent}${key}: ${stringify(value, depth)}`;
    case 'changed':
      return [
        `${lineIndent}- ${key}: ${stringify(firstValue, depth)}`,
        `${lineIndent}+ ${key}: ${stringify(secondValue, depth)}`,
      ].join('\n');
    case 'deleted':
      return `${lineIndent}- ${key}: ${stringify(value, depth)}`;
    case 'added':
      return `${lineIndent}+ ${key}: ${stringify(value, depth)}`;
    default:
      throw new Error(`Unknown node type: ${type}`);
  }
};

const formatDiff = (diff) => {
  const iter = (nodes, depth) => {
    const lines = nodes.map((node) => formatNode(node, depth));
    return `{\n${lines.join('\n')}\n${indent(depth - 1)}}`;
  };

  return iter(diff, 1);
};

export default formatDiff;
