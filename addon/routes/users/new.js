import { service } from "@ember/service";

import CreateRoute from "ember-emeis/-private/routes/create";

export default class UsersNewRoute extends CreateRoute {
  @service store;

  detailView = "users.edit";

  model() {
    return this.store.createRecord("user", { isActive: true });
  }
}
