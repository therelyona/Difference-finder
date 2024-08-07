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
  const { key, type } = node;
  const nodeIndent = indent(depth);
  const lineIndent = indent(depth, reducedIndentSize);

  switch (type) {
    case 'deleted':
      return `${lineIndent}- ${key}: ${stringify(node.value, depth)}`;
    case 'added':
      return `${lineIndent}+ ${key}: ${stringify(node.value, depth)}`;
    case 'unchanged':
      return `${nodeIndent}${key}: ${stringify(node.value, depth)}`;
    case 'nested': {
      const children = node.children.map((child) => formatNode(child, depth + 1)).join('\n');
      return `${nodeIndent}${key}: {\n${children}\n${nodeIndent}}`;
    }
    case 'changed':
      return [
        `${lineIndent}- ${key}: ${stringify(node.value1, depth)}`,
        `${lineIndent}+ ${key}: ${stringify(node.value2, depth)}`,
      ].join('\n');
    default:
      throw new Error(`Unknown node type: ${type}`);
  }
};

const stylishFormatDiff = (diff) => {
  const iter = (nodes, depth) => {
    const lines = nodes.map((node) => formatNode(node, depth));
    return `{\n${lines.join('\n')}\n${indent(depth - 1)}}`;
  };

  return iter(diff, 1);
};

export default stylishFormatDiff;
