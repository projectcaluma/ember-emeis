import { inject as service } from "@ember/service";
import { task } from "ember-concurrency";

import { confirmTask } from "../../decorators/confirm-task";

import PaginationController from "ember-emeis/-private/controllers/pagination";
import { handleTaskErrors } from "ember-emeis/-private/decorators";

export default class UsersIndexController extends PaginationController {
  @service emeisOptions;
  @service notification;
  @service intl;

  get emailAsUsername() {
    return this.emeisOptions.emailAsUsername;
  }

  get linkToRole() {
    return this.emeisOptions.navigationEntries?.includes("roles");
  }

  get linkToScope() {
    return this.emeisOptions.navigationEntries?.includes("scopes");
  }

  @task
  @confirmTask({ message: "emeis.form.confirmUserDelete" })
  @handleTaskErrors({ errorMessage: "emeis.form.delete-error" })
  *delete(model) {
    yield model.destroyRecord();
    this.notification.success(this.intl.t("emeis.form.delete-success"));
  }
}
