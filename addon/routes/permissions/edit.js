import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

import handleModelErrors from "ember-emeis/decorators/handle-model-errors";

export default class PermissionsEditRoute extends Route {
  @service notification;
  @service intl;

  @handleModelErrors({ routeFor404: "permissions.index" })
  async model({ permission_id: id }) {
    return await this.store.findRecord("permission", id);
  }
}
