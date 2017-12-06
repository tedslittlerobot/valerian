
export default class Confirmation {
  validate(value, field, validator) {
    const otherValue = validator.getData(`${field}_confirmation`);

    return otherValue === value;
  }

  error() {
    return 'confirmation';
  }

  replacements() {
    return {};
  }
}
