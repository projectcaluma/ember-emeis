import Helper from "@ember/component/helper";
import { service } from "@ember/service";

export default class CanDelete extends Helper {
  @service emeisOptions;

  compute([modelName, model]) {
    const option = this.emeisOptions[modelName]?.actions?.delete;
    const func = option?.func || option;
    return typeof func === "function" ? func(model) : true;
  }
}
