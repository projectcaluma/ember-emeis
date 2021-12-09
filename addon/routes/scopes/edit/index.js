import Route from "@ember/routing/route";

export default class ScopesEditIndexRoute extends Route {
  model() {
    return this.modelFor("scopes.edit");
  }
}
