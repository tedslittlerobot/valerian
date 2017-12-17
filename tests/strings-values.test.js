
import strings from '../src/strings';

test('strings strings loader', () => {
  require('../bootstrap/strings');

  expect(strings().required).toBe('The :name field is required.');
});

test('individual string value', () => {
  require('../bootstrap/strings');

  expect(strings('required')).toBe('The :name field is required.');
});

test('non-existant string value', () => {
  require('../bootstrap/strings');

  expect(strings('monkeys')).toBe('monkeys');
});
