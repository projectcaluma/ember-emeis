import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { tracked } from "@glimmer/tracking";

export default class PaginationController extends Controller {
  queryParams = ["page", "search", "sort"];

  @service router;

  @tracked page = 1;
  @tracked search;

  @action
  updateQueryParam(field, value) {
    // We dont want to set an empty string as this is still serialized
    if (typeof value === "string" && !value.length) {
      value = null;
    }

    this.router.transitionTo({ queryParams: { [field]: value } });
  }
}
