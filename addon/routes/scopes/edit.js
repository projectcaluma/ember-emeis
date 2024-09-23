import Route from "@ember/routing/route";
import { service } from "@ember/service";

import { handleModelErrors } from "ember-emeis/-private/decorators";

export default class ScopesEditRoute extends Route {
  @service notification;
  @service intl;
  @service store;

  @handleModelErrors({ routeFor404: "scopes.index" })
  model({ scope_id: id }) {
    return this.store.peekRecord("scope", id);
  }
}
