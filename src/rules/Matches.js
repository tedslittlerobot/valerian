
export default class Matches {
  constructor(other) {
    this.other = other;

    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
    this.replacements = this.replacements.bind(this);
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
