
export default class InstanceOf {
  constructor(comparitor) {
    this.comparitor = comparitor;

    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
    this.replacements = this.replacements.bind(this);
  }

  validate(value) {
    return value instanceof this.comparitor;
  }

  error() {
    return 'instance_of';
  }

  replacements() {
    return { class: this.comparitor.prototype.name };
  }
}
