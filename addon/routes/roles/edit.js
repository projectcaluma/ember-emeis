import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

import handleModelErrors from "ember-emeis/decorators/handle-model-errors";

export default class RolesEditRoute extends Route {
  @service notification;
  @service intl;

  @handleModelErrors({ routeFor404: "roles.index" })
  async model({ role_id: id }) {
    return await this.store.findRecord("role", id);
  }
}
