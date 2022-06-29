import Helper from "@ember/component/helper";
import { inject as service } from "@ember/service";

export default class OptionalLocalizedValue extends Helper {
  @service intl;
  @service emeisOptions;

  getFieldLocale(modelName) {
    return modelName
      ? this.emeisOptions.forceLocale?.[modelName]
      : undefined || this.intl.localizedFieldLocale || this.intl.primaryLocale;
  }

  compute([field, modelName]) {
    if (typeof field === "string") {
      return field;
    }
    return field?.[this.getFieldLocale(modelName)];
  }
}
