import Route from "@ember/routing/route";
import { service } from "@ember/service";

import { handleModelErrors } from "ember-emeis/-private/decorators";

export default class UsersEditRoute extends Route {
  @service notification;
  @service intl;
  @service store;

  @handleModelErrors({ routeFor404: "users.index" })
  async model({ user_id: id }) {
    return await this.store.findRecord("user", id);
  }
}
