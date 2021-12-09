import PaginationController from "ember-emeis/-private/controllers/pagination";

export default class ScopesEditACLController extends PaginationController {
  get queryParamsfilter() {
    return { scope: this.model.id };
  }
}
