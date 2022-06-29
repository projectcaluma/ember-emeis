import { faker } from "@faker-js/faker";
import { Factory } from "miragejs";

import localize from "./localize";

export default Factory.extend({
  username: () => faker.internet.userName(),
  firstName: () => faker.name.firstName(),
  lastName: () => faker.name.lastName(),
  email: () => faker.internet.email(),
  phone: () => faker.phone.phoneNumber(),
  disabled: () => faker.datatype.boolean(),
  language: () => faker.random.arrayElement(["en", "de"]),
  address: () => faker.address.streetAddress(),
  city: () => localize(faker.address.city()),
  zip: () => faker.datatype.number(),
  metainfo: () => {
    return {
      "additional-column-function": faker.company.bsNoun(),
    };
  },
  isActive: () => faker.datatype.boolean(),
});
