
import '../../bootstrap';
import { factory } from '../../src/RuleFactory';
import Url from '../../src/rules/Url';

test('basic url validation failure', () => {
  const rule = new Url();

  expect(rule.validate('foo')).toBe(false);
  expect(rule.error()).toBe('url');
});

test('url validation passing', () => {
  const rule = new Url();

  expect(rule.validate('http://foo')).toBe(true);
});

test('string construction', () => {
  const rule = factory.make('url');

  expect(rule instanceof Url).toBeTruthy();
});
