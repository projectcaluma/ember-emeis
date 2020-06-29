import Controller from "@ember/controller";
import { action } from "@ember/object";

export default class PermissionsEditController extends Controller {
  @action
  updateModel(model, formElements) {
    model.slug = formElements.slug.value;
    model.name = formElements.name.value;
    model.description = formElements.description.value;

    return model;
  }
}
