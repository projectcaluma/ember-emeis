import Controller from "@ember/controller";
import { action } from "@ember/object";

export default class ScopesEditController extends Controller {
  @action
  updateModel(model, formElements) {
    model.name = formElements.name.value;
    model.description = formElements.description.value;

    return model;
  }
}
