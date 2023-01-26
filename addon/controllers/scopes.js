import Controller from "@ember/controller";
import { inject as service } from "@ember/service";

export default class ScopesController extends Controller {
  @service hostRouter;
  @service store;

  get activeScope() {
    if (!this.hostRouter.currentRouteName.includes("scopes.edit")) {
      return null;
    }
    return this.hostRouter.currentRoute.attributes;
  }

  get rootScopes() {
    return this.store.peekAll("scope").filter((scope) => !scope.parent);
  }
}
