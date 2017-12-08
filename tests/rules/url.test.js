
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
