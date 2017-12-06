
export default class Confirmed {
  validate(value, field, validator) {
    const otherValue = validator.getData(`${field}_confirmation`);

    return otherValue === value;
  }

  error() {
    return 'confirmed';
  }

  replacements() {
    return {};
  }
}
