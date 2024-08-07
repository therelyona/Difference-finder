import _ from 'lodash';

const findDifferences = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortKeys = _.sortBy(keys);

  const differences = sortKeys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    }

    const value1 = data1[key];
    const value2 = data2[key];

    if (_.isEqual(value1, value2)) {
      return { key, value: value1, type: 'unchanged' };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, children: findDifferences(value1, value2), type: 'nested' };
    }

    return {
      key, value1, value2, type: 'changed',
    };
  });

  return differences;
};

export default findDifferences;
