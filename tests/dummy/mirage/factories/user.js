import { Factory } from "ember-cli-mirage";
import faker from "faker";

import localize from "./localize";

export default Factory.extend({
  username: () => faker.internet.userName(),
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  email: () => faker.internet.email(),
  phone: () => faker.phone.phoneNumber(),
  disabled: () => faker.random.boolean(),
  language: () => faker.random.arrayElement(["en", "de"]),
  address: () => faker.address.streetAddress(),
  city: () => localize(faker.address.city()),
  zip: () => faker.random.number(),
  meta: () => {},
  isActive: () => faker.random.boolean(),
});
