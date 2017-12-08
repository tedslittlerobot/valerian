
import TypeOf from '../../src/rules/TypeOf';

test('basic typeof validation failure', () => {
  const rule = new TypeOf('string');

  expect(rule.validate(42)).toBe(false);
  expect(rule.error()).toBe('type_of');
});

test('typeof validation passing', () => {
  const rule = new TypeOf('string');

  expect(rule.validate('foo')).toBe(true);
});

test('typeof replacements', () => {
  const rule = new TypeOf('string');

  expect(rule.replacements()).toEqual({ type: 'string' });
});
