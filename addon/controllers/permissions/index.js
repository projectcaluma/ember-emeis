import { inject as service } from "@ember/service";

import PaginationController from "ember-emeis/-private/controllers/pagination";

export default class PermissionsIndexController extends PaginationController {
  @service emeisOptions;

  get customColumns() {
    return this.emeisOptions.permission?.customColumns;
  }
}
