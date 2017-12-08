import _ from 'lodash';

export default class Messages {
  constructor() {
    this.messageList = {};

    this.addMessage = this.addMessage.bind(this);
    this.hasMessage = this.hasMessage.bind(this);
    this.hasMessages = this.hasMessages.bind(this);
    this.first = this.first.bind(this);
    this.all = this.all.bind(this);
    this.message = this.message.bind(this);
    this.messages = this.messages.bind(this);
  }

  addMessage(key, message) {
    if (!this.messageList[key]) {
      this.messageList[key] = [];
    }

    this.messageList[key].push(message);
  }

  hasMessages(key = null) {
    if (!key) return _.size(this.messageList) > 0;

    return !!this.messageList[key];
  }

  hasMessage(key = null) {
    return this.hasMessages(key);
  }

  first(key) {
    if (!this.messageList[key]) {
      return null;
    }

    return this.messageList[key][0];
  }

  message(key) {
    return this.first(key);
  }

  all(key = null) {
    if (!key) {
      // return all messages if no key is supplied
      return this.messageList;
    }

    if (!this.messageList[key]) {
      return null;
    }

    return this.messageList[key];
  }

  messages(key = null) {
    return this.all(key);
  }
}
