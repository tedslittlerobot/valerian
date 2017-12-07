
import Rule from './Rule';

export default class SkippingRule extends Rule {
  constrctor() {
    super();

    this.shouldSkipRemainingRules = this.shouldSkipRemainingRules.bind(this);
  }

  shouldSkipRemainingRules(value, field, validator) {
    throw new Error(`Rule [${this.constrctor.name}] must override shouldSkipRemainingRules method`);
  }
}
