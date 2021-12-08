import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default class ScopesController extends Controller {
  @service router;

  get activeScope() {
    return this.router.currentRoute.attributes;
  }

  get rootScopes() {
    return this.model?.filter((scope) => !scope.parent);
  }
}
