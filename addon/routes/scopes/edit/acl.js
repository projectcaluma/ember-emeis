import Route from "@ember/routing/route";

export default class ScopesEditAclRoute extends Route {
  model() {
    return this.modelFor("scopes.edit");
  }
}
