
import Required from '../../src/rules/Required';

test('basic required validation failure', () => {
  const rule = new Required;

  expect(rule.validate(null)).toBe(false);
  expect(rule.validate(undefined)).toBe(false);
  expect(rule.validate()).toBe(false);
  expect(rule.error()).toBe('required');
});

test('required validation passing', () => {
  const rule = new Required;

  expect(rule.validate('foo')).toBe(true);
});

test('required validation passing with falsy but existant values', () => {
  const rule = new Required;

  expect(rule.validate('')).toBe(true);
  expect(rule.validate(0)).toBe(true);
  expect(rule.validate(false)).toBe(true);
});
