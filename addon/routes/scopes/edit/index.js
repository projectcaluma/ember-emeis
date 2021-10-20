import Route from "@ember/routing/route";

export default class ScopesEditIndexRoute extends Route {
  async model() {
    return this.modelFor("scopes.edit");
  }
}
