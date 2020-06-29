import CreateRoute from "ember-emeis/routes/create";

export default class PermissionsNewRoute extends CreateRoute {
  detailView = "permissions.edit";

  model() {
    return this.store.createRecord("permission");
  }
}
