import { service } from "@ember/service";

import CreateRoute from "ember-emeis/-private/routes/create";

export default class RolesNewRoute extends CreateRoute {
  @service store;

  detailView = "roles.edit";

  model() {
    return this.store.createRecord("role");
  }
}
