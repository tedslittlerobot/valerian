
import RequiredWith from '../../src/rules/RequiredWith';

test('basic required with validation failure', () => {
  const rule = new RequiredWith('foo');

  const validator = {
    getData(field) {
      expect(field).toBe('foo');

      return 42;
    }
  }

  expect(rule.validate(null, null, validator)).toBe(false);
  expect(rule.error()).toBe('required_with');
});

test('basic required with validation passing due to with being empty', () => {
  const rule = new RequiredWith('foo');

  const validator = {
    getData(field) {
      expect(field).toBe('foo');

      return null;
    }
  }

  expect(rule.validate(null, null, validator)).toBe(true);
});

test('basic required with validation passing due to having a value', () => {
  const rule = new RequiredWith('foo');

  const validator = {
    getData(field) {
      expect(field).toBe('foo');

      return 42;
    }
  }

  expect(rule.validate('bar', null, validator)).toBe(true);
});

test('basic required with validation replacements', () => {
  const rule = new RequiredWith('bar');

  const validator = {
    guessFieldName(field) {
      expect(field).toBe('bar');

      return 'Bar';
    }
  };

  expect(rule.replacements('foo', validator)).toEqual({ other: 'Bar' });
});
