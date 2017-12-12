
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
  .extend('instance_of', arg => new InstanceOf(arg))
  .extend('matches', arg => new Matches(arg))
  .extend('one_of', (arg = '') => new OneOf(arg.split(',')))
  .extend('required_with', arg => new RequiredWith(arg))
  .extend('required_without', arg => new RequiredWithout(arg))
  .extend('type_of', arg => new TypeOf(arg));

// Rules with options
factory.extend('email', (flag) => {
  const rule = new Email();

  if (flag) {
    rule.strict(flag.includes('no'));
  }

  return rule;
});

factory.extend('integer', (flag) => {
  const rule = new Integer();

  // @todo - add options for min, max, between

  return rule;
});

factory.extend('is_string', (flag) => {
  const rule = new IsString();

  // @todo - add options for min, max, between

  return rule;
});

factory.extend('numeric', (flag) => {
  const rule = new Numeric();

  // @todo - add options for min, max, between

  return rule;
});

// Aliases

factory
  .alias('date_string', 'is_date_string')
  .alias('in', 'one_of')
  .alias('int', 'integer')
  .alias('string', 'is_string');
