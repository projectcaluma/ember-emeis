import { Factory } from "ember-cli-mirage";
import faker from "faker";

import localize from "./localize";

export default Factory.extend({
  slug: () => faker.lorem.slug(),
  name: () => localize(faker.lorem.word()),
  description: () => localize(faker.lorem.sentence()),
});
