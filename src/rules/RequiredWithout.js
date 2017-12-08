
import Required from './Required';

export default class RequiredWithout extends Required {
  constructor(other) {
    super();

    this.other = other;
  }

  validate(value, field, validator) {
    const otherData = validator.getData(this.other);

    const otherExists = otherData !== undefined && otherData !== null;

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
