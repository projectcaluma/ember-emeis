import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { task } from "ember-concurrency-decorators";

import PaginationController from "ember-emeis/-private/controllers/pagination";
import handleModelErrors from "ember-emeis/decorators/handle-model-errors";

export default class UsersEditAclController extends PaginationController {
  @service intl;
  @service notification;
  @service store;

  get queryParamsfilter() {
    return { user: this.model.id };
  }

  @tracked showAclWizzard = false;

  @task
  @handleModelErrors({ errorMessage: "emeis.form.save-error" })
  *createEntry(aclProperties) {
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

  @task
  @handleModelErrors({ errorMessage: "emeis.form.delete-error" })
  *deleteEntry(aclEntry, refreshDataTable) {
    yield aclEntry.destroyRecord();
    this.notification.success(this.intl.t("emeis.form.delete-success"));
    refreshDataTable();
  }
}
