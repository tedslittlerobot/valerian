
import Email from '../../src/rules/Email';

test('basic email validation failure', () => {
  const rule = new Email();

  expect(rule.validate('foo')).toBe(false);
  expect(rule.error()).toBe('email');
});

test('strict email validation passing', () => {
  const rule = new Email();

  expect(rule.validate('foo@bar.com')).toBe(true);
});

test('strict email validation failure', () => {
  const rule = new Email();

  expect(rule.validate('foo@bar')).toBe(false);
});

test('simple email validation passing', () => {
  const rule = new Email();
  rule.strict(false);

  expect(rule.validate('foo@bar')).toBe(true);
});
