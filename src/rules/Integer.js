
import Numeric from './Numeric';

export default class Integer extends Numeric {
  validate(value) {
    if (value !== parseInt(value, 10)) return false;

    return super.validate(value);
  }

  error() {
    if (this.rangeMin !== null && this.rangeMax !== null) return 'integer/between';

    if (this.rangeMin !== null) return 'integer/min';

    if (this.rangeMax !== null) return 'integer/max';

    return 'integer';
  }

  replacements() {
    return {};
  }
}
