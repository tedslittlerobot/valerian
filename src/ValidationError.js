import _ from 'lodash';

export default class ValidationError extends Error {
  constructor() {
    super('There were Validation Errors');

    this.errors = {};
    Error.captureStackTrace(this, ValidationError);

    this.addMessage = this.addMessage.bind(this);
    this.hasMessage = this.hasMessage.bind(this);
    this.hasMessages = this.hasMessages.bind(this);
    this.first = this.first.bind(this);
    this.all = this.all.bind(this);
  }

  addMessage(key, message) {
    if (!this.errors[key]) {
      this.errors[key] = [];
    }

    this.errors[key].push(message);
  }

  hasMessages(key = null) {
    if (!key) return _.size(this.errors) > 0;

    return !!this.errors[key];
  }

  hasMessage(key = null) {
    return this.hasMessage(key);
  }

  first(key) {
    if (!this.errors[key]) return null;

    return this.errors[key][0];
  }

  all(key = null) {
    if (!key) return this.errors; // return all errors if no key is supplied

    if (!this.errors[key]) return null;

    return this.errors[key];
  }
}
