import { inject as service } from "@ember/service";

import CreateRoute from "ember-emeis/-private/routes/create";

export default class PermissionsNewRoute extends CreateRoute {
  detailView = "permissions.edit";

  @service store;

  model() {
    return this.store.createRecord("permission");
  }
}
