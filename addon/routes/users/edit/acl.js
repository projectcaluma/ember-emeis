import Route from "@ember/routing/route";

export default class UsersEditAclRoute extends Route {
  model() {
    return this.modelFor("users.edit");
  }
}
