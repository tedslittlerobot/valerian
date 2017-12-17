
import '../../bootstrap';
import { factory } from '../../src/RuleFactory';
import Integer from '../../src/rules/Integer';

test('basic integer validation failure', () => {
  const rule = new Integer;

  expect(rule.validate('foo')).toBe(false);
  expect(rule.validate(4.2)).toBe(false);
  expect(rule.error()).toBe('integer');
});

test('integer validation passing', () => {
  const rule = new Integer;

  expect(rule.validate(42)).toBe(true);
});

test('integer error messages', () => {
  const rule = new Integer;

  expect(rule.min(1).error()).toBe('integer/min');
  expect(rule.min(null).max(1).error()).toBe('integer/max');
  expect(rule.between(1, 10).error()).toBe('integer/between');
});

test('string construction min', () => {
  const rule = factory.make('integer|min:3');

  expect(rule.rangeMin).toEqual(3);
  expect(rule.rangeMax).toBe(null);
});

test('string construction max', () => {
  const rule = factory.make('integer|max:3');

  expect(rule.rangeMin).toBe(null);
  expect(rule.rangeMax).toEqual(3);
});

test('string construction between', () => {
  const rule = factory.make('integer|between:3-4');

  expect(rule.rangeMin).toEqual(3);
  expect(rule.rangeMax).toEqual(4);
});
