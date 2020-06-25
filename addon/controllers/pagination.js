import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class PaginationController extends Controller {
  queryParams = ["page", "search"];

  @service router;

  @tracked page = 1;
  @tracked search;

  @action
  updateQueryParam(field, value) {
    this.router.transitionTo({ queryParams: { [field]: value || null } });
  }
}
