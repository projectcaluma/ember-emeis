import Controller from "@ember/controller";
import { action } from "@ember/object";

export default class RolesEditController extends Controller {
  get permissionFilter() {
    return { roles: this.model.id };
  }

  get displayPermissionTable() {
    return !this.model.isNew && this.model.permissions;
  }

  @action
  updateModel(model, formElements) {
    model.slug = formElements.slug.value;
    model.name = formElements.name.value;
    model.description = formElements.description.value;

    return model;
  }
}
