import faker from "@faker-js/faker";
import { Factory } from "miragejs";

import localize from "./localize";

export default Factory.extend({
  slug: () => faker.lorem.slug(),
  name: () => localize(faker.company.companyName()),
  description: () => localize(faker.lorem.sentence()),
});
