
import Rule from './Rule';

export default class Required extends Rule {
  validate(value) {
    return value !== undefined && value !== null;
  }

  error() {
    return 'required';
  }
}
