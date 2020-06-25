import Model from "@ember-data/model";
import { inject as service } from "@ember/service";

export default class LocalizedModel extends Model {
  @service intl;

  getUnlocalizedField(field) {
    return this[`_${field}`];
  }

  getFieldLocale() {
    return (
      this.localizedFieldLocale ||
      this.intl.localizedFieldLocale ||
      this.intl.primaryLocale
    );
  }
}
