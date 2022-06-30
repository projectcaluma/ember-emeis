import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class RolesEditController extends Controller {
  @service emeisOptions;

  get permissionFilter() {
    return { roles: this.model.id };
  }

  get displayPermissionTable() {
    return !this.model.isNew && this.model.permissions;
  }

  get metaFields() {
    return this.emeisOptions.role?.metaFields;
  }

  @action
  updateModel(model, formElements) {
    model.slug = formElements.slug.value;
    model.name = formElements.name.value;
    model.description = formElements.description.value;

    return model;
  }
}
