
import Rule from './Rule';

export default class OneOf extends Rule {
  constructor(items) {
    super();

    this.items = items;
  }

  validate(value) {
    return this.items.includes(value);
  }

  error() {
    return 'one_of';
  }
}
