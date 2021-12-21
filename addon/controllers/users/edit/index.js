import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

const ALL_ADDITIONAL_FIELDS = ["phone", "language", "address", "city", "zip"];

export default class UsersEditIndexController extends Controller {
  @service intl;
  @service emeisOptions;

  get metaFields() {
    return this.emeisOptions.metaFields?.user;
  }

  get emailAsUsername() {
    return this.emeisOptions.emailAsUsername;
  }

  get visibleFields() {
    if (!this.emeisOptions.additionalUserFields) {
      return ALL_ADDITIONAL_FIELDS;
    }

    return Object.keys(this.emeisOptions.additionalUserFields);
  }

  get requiredFields() {
    if (!this.emeisOptions.additionalUserFields) {
      return ALL_ADDITIONAL_FIELDS;
    }
    return Object.entries(this.emeisOptions.additionalUserFields, {})
      .filter(([, value]) => value === "required")
      .map(([key]) => key);
  }

  @action
  updateModel(model, formElements) {
    model.firstName = formElements.firstName.value;
    model.lastName = formElements.lastName.value;
    model.email = formElements.email.value;
    model.isActive = formElements.isActive.checked;

    // additional fields might not be present
    model.phone = formElements.phone?.value;
    model.language = formElements.language?.selectedOptions[0].value;
    model.address = formElements.address?.value;
    model.city = formElements.city?.value;
    model.zip = formElements.zip?.value;

    model.username = this.emailAsUsername
      ? formElements.email.value
      : formElements.username.value;

    return model;
  }
}
