
import SkippingRule from '../../src/rules/SkippingRule';

test('test virtual method errors', () => {
  const rule = new SkippingRule();

  expect(() => rule.shouldSkipRemainingRules()).toThrow('Rule [SkippingRule] must override shouldSkipRemainingRules method');
});
