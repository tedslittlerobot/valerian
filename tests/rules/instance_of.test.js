
import InstanceOf from '../../src/rules/InstanceOf';

class A {}
class B extends A {}

test('basic instanceof validation failure', () => {
  const rule = new InstanceOf(B);

  expect(rule.validate(A)).toBe(false);
  expect(rule.error()).toBe('instance_of');
});

test('instanceof validation passing', () => {
  const rule = new InstanceOf(A);

  expect(rule.validate(new A)).toBe(true);
  expect(rule.validate(new B)).toBe(true);
});

test('instanceof replacements', () => {
  const rule = new InstanceOf(A);

  expect(rule.replacements()).toEqual({ class: 'A' });
});
