import Route from "@ember/routing/route";
import { inject as service } from "@ember/service";

export default class ApplicationRoute extends Route {
  @service intl;

  afterModel() {
    this.intl.setLocale("en");
  }
}
