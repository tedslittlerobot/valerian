
import Rule from './Rule';

const regex = /^((http)|(https)):\/\/\S+$/;

export default class Url extends Rule {
  validate(value) {
    return regex.test(value);
  }

  error() {
    return 'url';
  }
}
