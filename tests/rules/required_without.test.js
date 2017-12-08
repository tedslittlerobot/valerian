
import RequiredWithout from '../../src/rules/RequiredWithout';

test('basic required without validation failure', () => {
  const rule = new RequiredWithout('foo');

  const validator = {
    getData(field) {
      expect(field).toBe('foo');

      return null;
    }
  }

  expect(rule.validate(null, null, validator)).toBe(false);
  expect(rule.error()).toBe('required_without');
});

test('basic required without validation passing due to with being empty', () => {
  const rule = new RequiredWithout('foo');

  const validator = {
    getData(field) {
      expect(field).toBe('foo');

      return 42;
    }
  }

  expect(rule.validate(null, null, validator)).toBe(true);
});

test('basic required without validation passing due to having a value', () => {
  const rule = new RequiredWithout('foo');

  const validator = {
    getData(field) {
      expect(field).toBe('foo');

      return null;
    }
  }

  expect(rule.validate('bar', null, validator)).toBe(true);
});

test('basic required without validation replacements', () => {
  const rule = new RequiredWithout('bar');

  const validator = {
    guessFieldName(field) {
      expect(field).toBe('bar');

      return 'Bar';
    }
  };

  expect(rule.replacements('foo', validator)).toEqual({ other: 'Bar' });
});
