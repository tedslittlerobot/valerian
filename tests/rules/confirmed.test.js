
import '../../bootstrap';
import { factory } from '../../src/RuleFactory';
import Confirmed from '../../src/rules/Confirmed';

test('basic confirmed validation failure', () => {
  const rule = new Confirmed();

  const validator = {
    getData(field) {
      expect(field).toBe('foo_confirmation');

      return null;
    }
  };

  expect(rule.validate('bar', 'foo', validator)).toBe(false);
  expect(rule.error()).toBe('confirmed');
});

test('basic confirmed validation passing', () => {
  const rule = new Confirmed();

  const validator = {
    getData(field) {
      expect(field).toBe('foo_confirmation');

      return 'bar';
    }
  };

  expect(rule.validate('bar', 'foo', validator)).toBe(true);
});

test('string construction', () => {
  const rule = factory.make('confirmed');

  expect(rule instanceof Confirmed).toBeTruthy();
});
