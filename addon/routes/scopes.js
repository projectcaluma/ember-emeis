import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class ScopesRoute extends Route {
  @service store;
  @service router;

  activate() {
    this.redirect(this.currentModel);
  }

  model() {
    return this.store.findAll("scope");
  }

  afterModel(scopes) {
    this.redirect(scopes);
  }

  redirect(scopes) {
    if (scopes?.firstObject) {
      this.router.transitionTo("ember-emeis.scopes.edit", scopes.firstObject);
    }
  }
}
