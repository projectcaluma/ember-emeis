import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default class ScopesController extends Controller {
  @service router;
  @service store;

  get activeScope() {
    if (!this.router.currentRouteName.includes("scopes.edit")) {
      return null;
    }
    return this.router.currentRoute.attributes;
  }

  get rootScopes() {
    return this.store.peekAll("scope").filter((scope) => !scope.parent);
  }
}
