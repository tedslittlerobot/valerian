
import strings from '../src/strings';

test('strings strings loader', () => {
  require('../set-default-strings');

  expect(strings().required).toBe('The :name field is required.');
});

test('individual string value', () => {
  require('../set-default-strings');

  expect(strings('required')).toBe('The :name field is required.');
});

test('non-existant string value', () => {
  require('../set-default-strings');

  expect(strings('monkeys')).toBe('monkeys');
});
