import { Factory } from "ember-cli-mirage";
import faker from "faker";

import localize from "./localize";

export default Factory.extend({
  name: () => localize(faker.company.companyName()),
  description: () => localize(faker.lorem.paragraph()),
  level: () => 0,
  meta: () => {},
});
