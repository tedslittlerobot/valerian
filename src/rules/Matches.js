
import Rule from './Rule';

export default class Matches extends Rule {
  constructor(other) {
    super();

    this.other = other;
  }

  validate(value, field, validator) {
    const otherValue = validator.getData(this.other);

    return otherValue === value;
  }

  error() {
    return 'matches';
  }

  replacements(field, validator) {
    return { other: validator.guessFieldName(this.other) };
  }
}
