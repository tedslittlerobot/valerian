
import {
  Confirmed,
  InstanceOf,
  IsDateString,
  Matches,
  OneOf,
  Optional,
  Required,
  RequiredWith,
  RequiredWithout,
  TypeOf,
  Url,
} from '../rules';

import { factory } from '../src/RuleFactory';

// The easy ones
factory.extend('confirmed', () => new Confirmed());
factory.extend('is_date_string', () => new IsDateString());
factory.extend('optional', () => new Optional());
factory.extend('required', () => new Required());
factory.extend('url', () => new Url());

// The less easy ones
factory.extend('instance_of', (arg) => new InstanceOf(arg));
factory.extend('matches', (arg) => new Matches(arg));
factory.extend('one_of', (arg = '') => new OneOf(arg.split(',')));
factory.extend('required_with', (arg) => new RequiredWith(arg));
factory.extend('required_without', (arg) => new RequiredWithout(arg));
factory.extend('type_of', (arg) => new TypeOf(arg));

// @todo - The harder ones
// email
// integer
// is_string
// numeric
