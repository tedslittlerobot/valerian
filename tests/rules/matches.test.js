
import Matches from '../../src/rules/Matches';

test('basic matches validation failure', () => {
  const rule = new Matches('bar');

  const validator = {
    getData(field) {
      expect(field).toBe('bar');

      return null;
    }
  };

  expect(rule.validate('foo', null, validator)).toBe(false);
  expect(rule.error()).toBe('matches');
});

test('basic matches validation passing', () => {
  const rule = new Matches('bar');

  const validator = {
    getData(field) {
      expect(field).toBe('bar');

      return 'foo';
    }
  };

  expect(rule.validate('foo', null, validator)).toBe(true);
});

test('basic matches validation replacements', () => {
  const rule = new Matches('bar');

  const validator = {
    guessFieldName(field) {
      expect(field).toBe('bar');

      return 'Bar';
    }
  };

  expect(rule.replacements('foo', validator)).toEqual({ other: 'Bar' });
});
