import Route from "@ember/routing/route";
import { service } from "@ember/service";

export default class ScopesRoute extends Route {
  @service store;
  @service hostRouter;

  model() {
    // this eager fetching is necessary, since we need a store-independent result set
    // for use-cases where we have other non-relevant scopes in store
    return this.store.query("scope", { sort: "full_name" });
  }

  redirect(scopes, transition) {
    if (
      transition.targetName === "ember-emeis.scopes.index" &&
      scopes.firstObject
    ) {
      this.hostRouter.replaceWith(
        "ember-emeis.scopes.edit",
        scopes.firstObject
      );
    }
  }
}
