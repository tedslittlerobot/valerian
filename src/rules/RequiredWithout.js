
import Required from './Required';

export default class RequiredWithout extends Required {
  constructor(other) {
    super();

    this.other = other;
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
