import Helper from "@ember/component/helper";
import { inject as service } from "@ember/service";

export default class OptionalTranslate extends Helper {
  @service intl;

  compute([string]) {
    return this.intl.exists(string) ? this.intl.t(string) : string;
  }
}
