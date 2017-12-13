
import '../../bootstrap';
import { factory } from '../../src/RuleFactory';
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

test('string construction', () => {
  const rule = factory.make('one_of|foo,bar');
  const alias = factory.make('in|foo');

  expect(rule instanceof OneOf).toBeTruthy();
  expect(alias instanceof OneOf).toBeTruthy();
  expect(rule.items).toEqual(['foo', 'bar']);
});

test('string construction required arguments', () => {
  expect(() => factory.make('one_of')).toThrow('Rule [one_of] requires an argument.');
});
