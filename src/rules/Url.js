
const regex = /^((http)|(https)):\/\/\S+$/;

export default class Url {
  validate(value) {
    return regex.test(value);
  }

  error() {
    return 'url';
  }

  replacements() {
    return {};
  }
}
