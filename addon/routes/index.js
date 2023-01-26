import Route from "@ember/routing/route";
import { service } from "@ember/service";

export default class IndexRoute extends Route {
  @service hostRouter;

  beforeModel() {
    this.hostRouter.transitionTo("ember-emeis.users");
  }
}
