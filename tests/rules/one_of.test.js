
import OneOf from '../../src/rules/OneOf';

const choices = ['foo', 'bar'];

test('basic one of validation failure', () => {
  const rule = new OneOf(choices);

  expect(rule.validate('baz')).toBe(false);
  expect(rule.error()).toBe('one_of');
});

test('one of validation passing', () => {
  const rule = new OneOf(choices);

  expect(rule.validate('foo')).toBe(true);
});
