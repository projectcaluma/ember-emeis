import { getOwner } from "@ember/application";
import Route from "@ember/routing/route";
import { service } from "@ember/service";

export default class IndexRoute extends Route {
  @service hostRouter;

  beforeModel() {
    const owner = getOwner(this);
    const mountPoint = owner.mountPoint;
    this.hostRouter.transitionTo(`${mountPoint}.users`);
  }
}
