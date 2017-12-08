import _ from 'lodash';

let strings = {};

const setStrings = (newStrings = {}) => {
  strings = newStrings;
};

const mergeStrings = (newStrings = {}) => {
  strings = _.extend(strings, newStrings);
};

export { setStrings, mergeStrings };

export default (key = null) => {
  if (key === null) return _.clone(strings);

  return strings[key] || key;
};
