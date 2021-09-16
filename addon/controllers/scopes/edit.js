import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class ScopesEditController extends Controller {
  @service emeisOptions;
  @service intl;

  get metaFields() {
    return this.emeisOptions.metaFields.scope;
  }

  @action
  updateModel(model, formElements) {
    model.name = formElements.name.value;
    model.description = formElements.description.value;

    return model;
  }

  @action
  updateMetaField(field, model, optionOrEvent) {
    const value = optionOrEvent.target?.value ?? optionOrEvent.value;
    model.meta = { ...model.meta, [field.slug]: value };
    model.notifyPropertyChange("meta");
  }
}
