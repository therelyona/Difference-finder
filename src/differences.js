import _ from 'lodash';

const findDifferences = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortKeys = _.sortBy(keys);

  const differences = sortKeys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isEqual(value1, value2)) {
      return { key, value: value1, type: 'unchanged' };
    }
    if (!_.has(data1, key) && _.has(data2, key)) {
      return { key, value: value2, type: 'added' };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { key, value: value1, type: 'deleted' };
    }
    return {
      key, firstValue: value1, secondValue: value2, type: 'changed',
    };
  });

  return differences;
};

export default findDifferences;
