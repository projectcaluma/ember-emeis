import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

import { handleModelErrors } from "ember-emeis/-private/decorators";

export default class RolesEditRoute extends Route {
  @service notification;
  @service intl;

  @handleModelErrors({ routeFor404: "roles.index" })
  model({ role_id: id }) {
    return this.store.findRecord("role", id);
  }
}
