
import IsDateString from '../../src/rules/IsDateString';

test('basic date validation failure', () => {
  const rule = new IsDateString;

  expect(rule.validate('foo')).toBe(false);
  expect(rule.error()).toBe('is_date_string');
});

test('date validation passing', () => {
  const rule = new IsDateString();

  expect(rule.validate('2012-01-01')).toBe(true);
});
