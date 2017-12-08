
import IsString from '../../src/rules/IsString';

test('basic string validation', () => {
  const rule = new IsString();

  expect(rule.validate('foo')).toBe(true);
  expect(rule.validate(42)).toBe(false);
  expect(rule.error(42)).toBe('is_string');
});

test('default empty string length', () => {
  const rule = new IsString();

  expect(rule.validate('')).toBe(false);
  expect(rule.error('')).toBe('is_string/min');
});

test('allow empty string', () => {
  const rule = new IsString();
  rule.emptiable();

  expect(rule.validate('')).toBe(true);
  expect(rule.validate('foo')).toBe(true);
});

test('check between values', () => {
  const rule = new IsString();
  rule.between(1, 5);

  expect(rule.validate('f')).toBe(true);
  expect(rule.validate('foo')).toBe(true);
  expect(rule.validate('fooba')).toBe(true);
  expect(rule.validate('')).toBe(false);
  expect(rule.error('')).toBe('is_string/between');
  expect(rule.validate('foobarbaz')).toBe(false);
  expect(rule.error('foobarbaz')).toBe('is_string/between');
});

test('check max value', () => {
  const rule = new IsString();
  rule.min(null);
  rule.max(10);

  expect(rule.validate('foobar')).toBe(true);
  expect(rule.validate('foobarbazfoobarbaz')).toBe(false);
  expect(rule.error('foobarbazfoobarbaz')).toBe('is_string/max');
});

test('check min value', () => {
  const rule = new IsString();
  rule.min(10);

  expect(rule.validate('foobar')).toBe(false);
  expect(rule.error('foobarbazfoobarbaz')).toBe('is_string/min');
  expect(rule.validate('foobarbazfoobarbaz')).toBe(true);
});

test('test impossible situation for code coverage', () => {
  const rule = new IsString();
  rule.emptiable();
  // get the error of a string that passes

  expect(rule.error('foobar')).toBe('is_string');
});
