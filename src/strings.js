import _ from 'lodash';

let strings = {};

export function setStrings(newStrings) {
  strings = newStrings;
}

export function mergeStrings(newStrings) {
  strings = _.extend(strings, newStrings);
}

export default () => _.clone(strings);
