
import '../../bootstrap';
import { factory } from '../../src/RuleFactory';
import Numeric from '../../src/rules/Numeric';

test('basic numeric validation failure', () => {
  const rule = new Numeric;

  expect(rule.validate('foo')).toBe(false);
  expect(rule.error()).toBe('numeric');
});

test('basic numeric min validation failure', () => {
  const rule = new Numeric;

  expect(rule.min(1).validate(0)).toBe(false);
  expect(rule.error()).toBe('numeric/min');
});

test('basic numeric max validation failure', () => {
  const rule = new Numeric;

  expect(rule.max(1).validate(42)).toBe(false);
  expect(rule.error()).toBe('numeric/max');
});

test('basic numeric between validation failure', () => {
  const rule = new Numeric;

  expect(rule.between(1, 42).validate(108)).toBe(false);
  expect(rule.error()).toBe('numeric/between');
});

test('numeric validation passing', () => {
  const rule = new Numeric;

  expect(rule.validate(42)).toBe(true);
  expect(rule.validate(4.2)).toBe(true);
});

test('numeric replacements', () => {
  const rule = new Numeric;

  expect(rule.between(1, 42).replacements()).toEqual({ min: 1, max: 42 });
});

test('string construction', () => {
  const rule = factory.make('numeric');
  const alias = factory.make('number');

  expect(rule instanceof Numeric).toBeTruthy();
  expect(alias instanceof Numeric).toBeTruthy();
});

test('string construction min', () => {
  const rule = factory.make('numeric|min:3');

  expect(rule.rangeMin).toEqual(3);
  expect(rule.rangeMax).toBe(null);
});

test('string construction max', () => {
  const rule = factory.make('numeric|max:3');

  expect(rule.rangeMin).toBe(null);
  expect(rule.rangeMax).toEqual(3);
});

test('string construction between', () => {
  const rule = factory.make('numeric|between:3-4');

  expect(rule.rangeMin).toEqual(3);
  expect(rule.rangeMax).toEqual(4);
});
