import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { task } from "ember-concurrency";
import { saveAs } from "file-saver";

import { handleTaskErrors } from "ember-emeis/-private/decorators";

export default class UsersController extends Controller {
  @service notification;
  @service intl;
  @service fetch;

  @task
  @handleTaskErrors
  *export() {
    const response = yield this.fetch.fetch(`/api/v1/users/export`);

    const filename = response.headers
      .get("content-disposition")
      .match(/filename="(.*)"/)[1];

    saveAs(yield response.blob(), filename);
  }
}
