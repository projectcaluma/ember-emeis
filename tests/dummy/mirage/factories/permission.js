import { faker } from "@faker-js/faker";
import { Factory } from "miragejs";

import localize from "./localize";

export default Factory.extend({
  slug: () => faker.lorem.slug(),
  name: () => localize(faker.lorem.word()),
  description: () => localize(faker.lorem.sentence()),
  metainfo: () => {
    return {
      "additional-column-function": faker.company.bsNoun(),
    };
  },
});
