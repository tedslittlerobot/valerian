
import Numeric from './Numeric';

export default class Integer extends Numeric {
  validate(value) {
    // @todo = check if is integer
    if (typeof value !== 'number') return false;

    return parent.validate(value);
  }
}
