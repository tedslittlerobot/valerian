
export default class IsString {
  constructor() {
    this.rangeMin = 1;
    this.rangeMax = null;

    this.min = this.min.bind(this);
    this.max = this.max.bind(this);
    this.between = this.between.bind(this);
    this.emptiable = this.emptiable.bind(this);
    this.validate = this.validate.bind(this);
    this.error = this.error.bind(this);
    this.replacements = this.replacements.bind(this);
  }

  min(value) {
    this.rangeMin = value;

    return this;
  }

  max(value) {
    this.rangeMin = value;

    return this;
  }

  between(min, max) {
    this.rangeMin = min;
    this.rangeMax = max;

    return this;
  }

  emptiable() {
    this.rangeMin = 0;

    return this;
  }

  validate(value) {
    if (typeof value !== 'string') return false;

    // eslint-disable-next-line prefer-destructuring
    const length = value.length;

    if (this.rangeMin !== null && length < this.rangeMin) return false;

    if (this.rangeMax !== null && length > this.rangeMax) return false;

    return true;
  }

  error() {
    if (this.rangeMin !== null && this.rangeMax !== null) return 'is_string/between';

    if (this.rangeMin !== null) return 'is_string/min';

    if (this.rangeMax !== null) return 'is_string/max';

    return 'is_string';
  }

  replacements() {
    return { min: this.rangeMin, max: this.rangeMax };
  }
}
