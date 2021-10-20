import { inject as service } from "@ember/service";

import PaginationController from "ember-emeis/-private/controllers/pagination";

export default class ScopesEditACLController extends PaginationController {
  @service intl;
  @service store;

  get queryParamsfilter() {
    return { scope: this.model.id };
  }
}
