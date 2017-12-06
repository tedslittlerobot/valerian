import _ from 'lodash';

export default class ValidationError extends Error {
  constructor() {
    super('There were Validation Errors');

    this.messages = {};
    Error.captureStackTrace(this, ValidationError);

    this.addMessage = this.addMessage.bind(this);
    this.hasMessages = this.hasMessages.bind(this);
  }

  addMessage(key, message) {
    if (!this.messages[key]) {
      this.messages[key] = [];
    }

    this.messages[key].push(message);
  }

  hasMessages() {
    return _.size(this.messages) > 0;
  }
}
