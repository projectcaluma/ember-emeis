import { faker } from "@faker-js/faker";
import { Factory } from "miragejs";

import localize from "./localize";

export default Factory.extend({
  name: () => localize(faker.company.companyName()),
  "full-name": () => localize(faker.company.companyName()),
  description: () => localize(faker.lorem.paragraph()),
  level: () => 0,
  meta: () => {},
});
