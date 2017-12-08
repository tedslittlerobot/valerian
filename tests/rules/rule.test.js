
import Rule from '../../src/rules/Rule';

test('test virtual method errors', () => {
  const rule = new Rule();

  expect(() => rule.validate()).toThrow('Rule [Rule] must override validate method');
  expect(() => rule.error()).toThrow('Rule [Rule] must override error method');
});

test('test replacements', () => {
  const rule = new Rule();

  expect(rule.allReplacements('foo', 'bar', 'baz', null)).toEqual({ field: 'foo', value: 'bar', name: 'baz' });
});

test('test passes through field and validator', () => {
  const rule = new Rule();

  rule.replacements = (field, validator) => {
    expect(field).toBe('foo');
    expect(validator).toBe('monkeys');
  }

  rule.allReplacements('foo', 'bar', 'baz', 'monkeys');
});
