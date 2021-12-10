import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class ScopesRoute extends Route {
  @service store;
  @service router;

  model() {
    return this.store.findAll("scope");
  }

  redirect(scopes, transition) {
    if (transition.targetName === "ember-emeis.scopes.index") {
      this.router.replaceWith("ember-emeis.scopes.edit", scopes.firstObject);
    }
  }
}
