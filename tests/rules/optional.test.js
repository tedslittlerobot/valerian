
import '../../bootstrap';
import { factory } from '../../src/RuleFactory';
import Optional from '../../src/rules/Optional';

test('test validate is true', () => {
  const rule = new Optional();

  expect(rule.validate()).toBe(true);
});

test('test error message', () => {
  const rule = new Optional();

  expect(rule.error()).toBe('optional');
});

test('test skip rule check with actual values', () => {
  const rule = new Optional();

  expect(rule.shouldSkipRemainingRules('foo')).toBe(false);
  expect(rule.shouldSkipRemainingRules(42)).toBe(false);
  expect(rule.shouldSkipRemainingRules(new Date)).toBe(false);
});

test('test skip rule check with falsy values', () => {
  const rule = new Optional();

  expect(rule.shouldSkipRemainingRules('')).toBe(false);
  expect(rule.shouldSkipRemainingRules(0)).toBe(false);
});

test('test skip rule check with empty values', () => {
  const rule = new Optional();

  expect(rule.shouldSkipRemainingRules(null)).toBe(true);
  expect(rule.shouldSkipRemainingRules(undefined)).toBe(true);
  expect(rule.shouldSkipRemainingRules()).toBe(true);
});

test('string construction', () => {
  const rule = factory.make('optional');

  expect(rule instanceof Optional).toBeTruthy();
});
