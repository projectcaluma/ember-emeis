import { inject as service } from "@ember/service";

import PaginationController from "ember-emeis/-private/controllers/pagination";

export default class RolesIndexController extends PaginationController {
  @service emeisOptions;

  get customColumns() {
    return this.emeisOptions.role?.customColumns;
  }
}
