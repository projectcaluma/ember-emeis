import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class ScopesRoute extends Route {
  @service store;
  @service router;

  model() {
    // this eager fetching is necessary, since we need a store-independent result set
    // for use-cases where we have other non-relevant scopes in store
    return this.store.query("scope", {});
  }

  redirect(scopes, transition) {
    if (
      transition.targetName === "ember-emeis.scopes.index" &&
      scopes.firstObject
    ) {
      this.router.replaceWith("ember-emeis.scopes.edit", scopes.firstObject);
    }
  }
}
