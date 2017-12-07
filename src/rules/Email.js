
import Rule from './Rule';

// From http://emailregex.com/
const strictRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const nonStrictRegex = /\S+@\S+/;

export default class Email extends Rule {
  constructor() {
    super();

    this.useStrict = true;
    this.strict = this.strict.bind(this);
  }

  strict(strict = true) {
    this.useStrict = strict;
  }

  validate(value) {
    return (this.useStrict ? strictRegex : nonStrictRegex)
      .test(value);
  }

  error() {
    return 'email';
  }
}
