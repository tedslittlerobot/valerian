
import {
  Confirmed,
  Email,
  InstanceOf,
  Integer,
  IsDateString,
  IsString,
  Matches,
  Numeric,
  OneOf,
  Optional,
  Required,
  RequiredWith,
  RequiredWithout,
  TypeOf,
  Url,
} from '../rules';

import { factory } from '../src/RuleFactory';

factory
  // Rules with no arguments
  .extend('confirmed', () => new Confirmed())
  .extend('is_date_string', () => new IsDateString())
  .extend('optional', () => new Optional())
  .extend('required', () => new Required())
  .extend('url', () => new Url())
  // Rules with arguments
  .extend('instance_of', arg => {
    if (arg === undefined) {
      throw new Error('Rule [instance_of] requires an argument.');
    }
    return new InstanceOf(arg);
  })
  .extend('matches', arg => {
    if (arg === undefined) {
      throw new Error('Rule [matches] requires an argument.');
    }
    return new Matches(arg);
  })
  .extend('one_of', list => {
    if (list === undefined) {
      throw new Error('Rule [one_of] requires an argument.');
    }

    return new OneOf(list);
  })
  .extend('required_with', arg => {
    if (arg === undefined) {
      throw new Error('Rule [required_with] requires an argument.');
    }
    return new RequiredWith(arg);
  })
  .extend('required_without', arg => {
    if (arg === undefined) {
      throw new Error('Rule [required_without] requires an argument.');
    }
    return new RequiredWithout(arg);
  })
  .extend('type_of', arg => {
    if (arg === undefined) {
      throw new Error('Rule [type_of] requires an argument.');
    }
    return new TypeOf(arg);
  });

// Rules with options
factory.extend('email', (flag) => {
  const rule = new Email();

  if (flag) {
    rule.strict(!flag.includes('no'));
  }

  return rule;
});

factory.extend('integer', (options = {}) => {
  const rule = new Integer();

  if (options.min) {
    rule.min(options.min);
  }

  if (options.max) {
    rule.max(options.max);
  }

  if (options.between) {
    rule.between(...options.between.split('-'));
  }

  return rule;
});

factory.extend('is_string', (options = {}) => {
  const rule = new IsString();

  if (options.min) {
    rule.min(options.min);
  }

  if (options.max) {
    rule.max(options.max);
  }

  if (options.between) {
    rule.between(...options.between.split('-'));
  }

  return rule;
});

factory.extend('numeric', (options = {}) => {
  const rule = new Numeric();

  if (options.min) {
    rule.min(options.min);
  }

  if (options.max) {
    rule.max(options.max);
  }

  if (options.between) {
    rule.between(...options.between.split('-'));
  }

  return rule;
});

// Aliases

factory
  .alias('date_string', 'is_date_string')
  .alias('in', 'one_of')
  .alias('int', 'integer')
  .alias('number', 'numeric')
  .alias('string', 'is_string');
