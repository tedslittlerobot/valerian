
export default class Numeric {
  constructor() {
    this.rangeMin = null;
    this.rangeMax = null;

    this.min = this.min.bind(this);
    this.max = this.max.bind(this);
    this.between = this.between.bind(this);
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

  validate(value) {
    if (typeof value !== 'number') return false;

    if (this.rangeMin !== null && value < this.rangeMin) return false;

    if (this.rangeMax !== null && value < this.rangeMax) return false;

    return true;
  }

  error() {
    return 'numeric';
  }

  replacements() {
    return { min: this.rangeMin, max: this.rangeMax };
  }
}
