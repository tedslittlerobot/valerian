
import Rule from './Rule';

export default class TypeOf extends Rule {
  constructor(comparitor) {
    super();

    this.comparitor = comparitor;
  }

  validate(value) {
    // eslint-disable-next-line valid-typeof
    return typeof value === this.comparitor;
  }

  error() {
    return 'type_of';
  }

  replacements() {
    return { type: this.comparitor };
  }
}
