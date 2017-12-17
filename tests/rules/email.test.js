
import '../../bootstrap';
import { factory } from '../../src/RuleFactory';
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

test('string construction', () => {
  const rule = factory.make('email');

  expect(rule instanceof Email).toBeTruthy();
});

test('string construction arguments', () => {
  expect(factory.make('email').useStrict).toBeTruthy();
  expect(factory.make('email|not-strict').useStrict).toBeFalsy();
  expect(factory.make('email|strict').useStrict).toBeTruthy();
});
