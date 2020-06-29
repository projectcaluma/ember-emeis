import { assert } from "@ember/debug";
import Route from "@ember/routing/route";

export default class CreateRoute extends Route {
  getDetailView() {
    assert("`detailView` must be defined", this.detailView);
    return this.detailView;
  }
  get templateName() {
    return this.getDetailView();
  }
  get controllerName() {
    return this.getDetailView();
  }
}
