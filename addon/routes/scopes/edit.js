import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

import handleModelErrors from "ember-emeis/decorators/handle-model-errors";

export default class ScopesEditRoute extends Route {
  @service notification;
  @service intl;

  @handleModelErrors({ routeFor404: "scopes.index" })
  async model({ scope_id: id }) {
    return await this.store.findRecord("scope", id);
  }
}
