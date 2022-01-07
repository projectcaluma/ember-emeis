import CreateRoute from "ember-emeis/-private/routes/create";

export default class UsersNewRoute extends CreateRoute {
  detailView = "users.edit";

  model() {
    return this.store.createRecord("user");
  }
}
