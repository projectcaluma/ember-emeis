import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class UsersEditIndexController extends Controller {
  @service intl;

  @action
  updateModel(model, formElements) {
    model.username = formElements.username.value;
    model.firstName = formElements.firstName.value;
    model.lastName = formElements.lastName.value;
    model.email = formElements.email.value;
    model.phone = formElements.phone.value;
    model.language = formElements.language.selectedOptions[0].value;
    model.address = formElements.address.value;
    model.city = formElements.city.value;
    model.zip = formElements.zip.value;
    model.isActive = formElements.isActive.checked;

    return model;
  }
}
