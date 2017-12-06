
export default class TypeOf {
  constructor(comparitor) {
    this.comparitor = comparitor;

    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
    this.replacements = this.replacements.bind(this);
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
