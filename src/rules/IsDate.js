
import Rule from './Rule';

export default class IsDate extends Rule {
  validate(value) {
    return !Number.isNaN(Date.parse(value));
  }

  error() {
    return 'is_date';
  }
}
