import { inject as service } from "@ember/service";
import Model from "@ember-data/model";

export default class LocalizedModel extends Model {
  @service intl;
  @service emeisOptions;

  getUnlocalizedField(field) {
    return this[`_${field}`];
  }

  getFieldLocale() {
    return (
      this.emeisOptions.forceLocale?.[this.constructor.modelName] ||
      this.intl.localizedFieldLocale ||
      this.intl.primaryLocale
    );
  }
}
