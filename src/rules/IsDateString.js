
import Rule from './Rule';

export default class IsDateString extends Rule {
  validate(value) {
    return !Number.isNaN(Date.parse(value));
  }

  error() {
    return 'is_date_string';
  }
}
