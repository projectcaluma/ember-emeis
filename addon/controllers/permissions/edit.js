import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class PermissionsEditController extends Controller {
  @service emeisOptions;

  get metaFields() {
    return this.emeisOptions.permission?.metaFields;
  }

  @action
  updateModel(model, formElements) {
    model.slug = formElements.slug.value;
    model.name = formElements.name.value;
    model.description = formElements.description.value;

    return model;
  }

  @action setRoles(roles) {
    this.model.roles = roles;
  }
}
