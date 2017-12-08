
import Rule from './Rule';

export default class SkippingRule extends Rule {
  constructor() {
    super();

    this.shouldSkipRemainingRules = this.shouldSkipRemainingRules.bind(this);
  }

  shouldSkipRemainingRules(value, field, validator) {
    throw new Error(`Rule [${this.constructor.name}] must override shouldSkipRemainingRules method`);
  }
}
