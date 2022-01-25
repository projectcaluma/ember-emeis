import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { dropTask } from "ember-concurrency";

const ALL_ADDITIONAL_FIELDS = ["phone", "language", "address", "city", "zip"];

import PaginationController from "ember-emeis/-private/controllers/pagination";
import { handleTaskErrors } from "ember-emeis/-private/decorators";

export default class UsersEditController extends PaginationController {
  @service intl;
  @service emeisOptions;
  @service notification;
  @service store;

  @tracked showAclWizzard = false;

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

  get queryParamsfilter() {
    return { user: this.model.id };
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

  @dropTask
  @handleTaskErrors({ errorMessage: "emeis.form.save-error" })
  *createAclEntry(aclProperties) {
    const aclEntry = this.store.createRecord("acl", { ...aclProperties });

    try {
      yield aclEntry.save();
      this.notification.success(this.intl.t("emeis.form.save-success"));
      this.showAclWizzard = false;
    } catch (exception) {
      if (
        exception.isAdapterError &&
        exception.errors[0].status === "400" &&
        exception.errors[0].code === "unique"
      ) {
        this.notification.danger(this.intl.t("emeis.acl-wizzard.duplicate"));
      } else {
        throw exception;
      }
    }
  }

  @dropTask
  @handleTaskErrors({ errorMessage: "emeis.form.delete-error" })
  *deleteAclEntry(aclEntry, refreshDataTable) {
    yield aclEntry.destroyRecord();
    this.notification.success(this.intl.t("emeis.form.delete-success"));
    refreshDataTable();
  }
}
