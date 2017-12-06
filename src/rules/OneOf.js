
export default class OneOf {
  constructor(items) {
    this.items = items;

    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
    this.replacements = this.replacements.bind(this);
  }

  validate(value) {
    return this.items.includes(value);
  }

  error() {
    return 'one_of';
  }

  replacements() {
    return {};
  }
}
