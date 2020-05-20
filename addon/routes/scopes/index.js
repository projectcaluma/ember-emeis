import Route from "@ember/routing/route";

export default class GroupsIndexRoute extends Route {
  model() {
    return this.store.findAll("scope");
  }
}
