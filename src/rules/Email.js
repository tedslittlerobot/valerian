
// From http://emailregex.com/
const strictRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nonStrictRegex = /\S+@\S+/;

export default class Email {
  constructor() {
    this.useStrict = true;

    this.strict = this.strict.bind(this);
    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
    this.replacements = this.replacements.bind(this);
  }

  strict() {
    this.useStrict = true;
  }

  validate(value) {
    return (this.useStrict ? strictRegex : nonStrictRegex)
      .test(value);
  }

  error() {
    return 'email';
  }

  replacements() {
    return {};
  }
}
