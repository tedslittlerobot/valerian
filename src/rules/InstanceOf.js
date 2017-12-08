
import Rule from './Rule';

export default class InstanceOf extends Rule {
  constructor(comparitor) {
    super();

    this.comparitor = comparitor;
  }

  validate(value) {
    return value instanceof this.comparitor;
  }

  error() {
    return 'instance_of';
  }

  replacements() {
    return { class: this.comparitor.name };
  }
}
