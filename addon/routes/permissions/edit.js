import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

import { handleModelErrors } from "ember-emeis/-private/decorators";

export default class PermissionsEditRoute extends Route {
  @service notification;
  @service intl;
  @service store;

  @handleModelErrors({ routeFor404: "permissions.index" })
  model({ permission_id: id }) {
    return this.store.findRecord("permission", id);
  }
}
