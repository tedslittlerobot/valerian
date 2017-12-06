
export default class RequiredWithout {
  constructor(other) {
    this.other = other;

    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
    this.replacements = this.replacements.bind(this);
  }

  validate(value, field, validator) {
    const otherExists = validator.getData(this.other) !== undefined;

    return !otherExists ?
      (value !== undefined && value !== null) :
      true;
  }

  error() {
    return 'required_without';
  }

  replacements(field, validator) {
    return { other: validator.guessFieldName(this.other) };
  }
}
