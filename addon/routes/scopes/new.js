import CreateRoute from "ember-emeis/-private/routes/create";

export default class ScopesNewRoute extends CreateRoute {
  detailView = "scopes.edit";

  model() {
    return this.store.createRecord("scope", { isActive: true });
  }
}
