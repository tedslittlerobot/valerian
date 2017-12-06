
import Numeric from './Numeric';

export default class Integer extends Numeric {
  validate(value) {
    if (value !== parseInt(value, 10)) return false;

    return super.validate(value);
  }

  error() {
    return 'integer';
  }

  replacements() {
    return {};
  }
}
