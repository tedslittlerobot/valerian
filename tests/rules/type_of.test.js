
import '../../bootstrap';
import { factory } from '../../src/RuleFactory';
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

test('string construction', () => {
  const rule = factory.make('type_of:foo');

  expect(rule instanceof TypeOf).toBeTruthy();
  expect(rule.comparitor).toBe('foo');
});

test('string construction required arguments', () => {
  expect(() => factory.make('type_of')).toThrow('Rule [type_of] requires an argument.');
});
