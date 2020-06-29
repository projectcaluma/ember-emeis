import CreateRoute from "ember-emeis/-private/routes/create";

export default class RolesNewRoute extends CreateRoute {
  detailView = "roles.edit";

  model() {
    return this.store.createRecord("role");
  }
}
