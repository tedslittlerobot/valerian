import _ from 'lodash';

export default class Rule {
  constructor() {
    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
    this.allReplacements = this.allReplacements.bind(this);
    this.replacements = this.replacements.bind(this);
  }

  validate(value, field, validator) {
    throw new Error(`Rule [${this.constructor.name}] must override validate method`);
  }

  error() {
    throw new Error(`Rule [${this.constructor.name}] must override error method`);
  }

  allReplacements(field, value, name, validator) {
    return _.extend({ field, value, name }, this.replacements(field, validator));
  }

  replacements(field, validator) {
    return {};
  }
}
