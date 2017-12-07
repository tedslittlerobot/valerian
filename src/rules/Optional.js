
import SkippingRule from './SkippingRule';

export default class Optional extends SkippingRule {
  validate(value) {
    return true;
  }

  error() {
    return 'optional';
  }

  shouldSkipRemainingRules(value, field, validator) {
    // return true if value is empty
    return value === undefined && value === null;
  }
}
