import Route from "@ember/routing/route";

export default class UsersEditIndexRoute extends Route {
  async model() {
    return this.modelFor("users.edit");
  }
}
