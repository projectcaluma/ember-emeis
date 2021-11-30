import Controller from "@ember/controller";
import { task, lastValue } from "ember-concurrency";
import { inject as service } from "@ember/service";

export default class ScopesController extends Controller {
  @lastValue("fetchData") scopes;
  @service router;

  @task
  *fetchData() {
    const data = yield this.store.findAll("scope");

    console.log(this.router);
    return data;
  }

  get activeScope() {
    return this.router.currentRoute.attributes;
  }

  get rootScopes() {
    return this.scopes?.filter((scope) => scope.level == 0);
  }
}
