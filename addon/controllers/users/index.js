import { inject as service } from "@ember/service";

import PaginationController from "ember-emeis/-private/controllers/pagination";

export default class UsersIndexController extends PaginationController {
  @service emeisOptions;

  get emailAsUsername() {
    return this.emeisOptions.emailAsUsername;
  }
}
