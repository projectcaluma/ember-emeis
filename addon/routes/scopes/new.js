import { service } from "@ember/service";

import CreateRoute from "ember-emeis/-private/routes/create";

export default class ScopesNewRoute extends CreateRoute {
  @service store;

  detailView = "scopes.edit";

  model() {
    return this.store.createRecord("scope", { isActive: true });
  }
}
