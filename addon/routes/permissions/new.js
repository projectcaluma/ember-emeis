import CreateRoute from "ember-emeis/-private/routes/create";

export default class PermissionsNewRoute extends CreateRoute {
  detailView = "permissions.edit";

  model() {
    return this.store.createRecord("permission");
  }
}
