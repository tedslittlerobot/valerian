
import Rule from './Rule';

export default class Confirmed extends Rule {
  validate(value, field, validator) {
    const otherValue = validator.getData(`${field}_confirmation`);

    return otherValue === value;
  }

  error() {
    return 'confirmed';
  }
}
