import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";
import { task } from "ember-concurrency";
import { saveAs } from "file-saver";

import { confirmTask } from "../../decorators/confirm-task";

import PaginationController from "ember-emeis/-private/controllers/pagination";
import { handleTaskErrors } from "ember-emeis/-private/decorators";

export default class UsersIndexController extends PaginationController {
  @service emeisOptions;
  @service notification;
  @service intl;
  @service fetch;

  @tracked filter_active = true;

  get customColumns() {
    return this.emeisOptions.user?.customColumns;
  }

  get emailAsUsername() {
    return this.emeisOptions.emailAsUsername;
  }

  get linkToRole() {
    return this.emeisOptions.navigationEntries?.includes("roles");
  }

  get linkToScope() {
    return this.emeisOptions.navigationEntries?.includes("scopes");
  }

  get filtersVisible() {
    return this.emeisOptions.user?.filtersVisible ?? true;
  }

  get filters() {
    return { isActive: this.filter_active };
  }

  @action
  updateFilter(type, eventOrValue) {
    this[`filter_${type}`] = eventOrValue?.target?.value ?? eventOrValue;
    // reset page filter
    this.page = 1;
  }

  @task
  @confirmTask({ message: "emeis.form.confirmEntryDelete" })
  @handleTaskErrors({ errorMessage: "emeis.form.delete-error" })
  *delete(model) {
    yield model.destroyRecord();
    this.notification.success(this.intl.t("emeis.form.delete-success"));
  }

  @task
  @handleTaskErrors
  *export() {
    const filters = Object.fromEntries(
      Object.entries(this.filters).map(([key, value]) => [
        `filter[${key}]`,
        value,
      ])
    );
    const queryParams = new URLSearchParams(filters).toString();
    const response = yield this.fetch.fetch(
      `/api/v1/users/export?${queryParams}`
    );

    const filename = response.headers
      .get("content-disposition")
      .match(/filename="(.*)"/)[1];

    saveAs(yield response.blob(), filename);
  }
}
