import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { task, lastValue } from "ember-concurrency";

export default class ScopesController extends Controller {
  @service router;
  @lastValue("fetchData") scopes;

  @task
  *fetchData() {
    const data = yield this.store.findAll("scope");
    return data;
  }

  get activeScope() {
    return this.router.currentRoute.attributes;
  }

  get rootScopes() {
    return this.scopes?.filter((scope) => scope.level === 0);
  }
}
