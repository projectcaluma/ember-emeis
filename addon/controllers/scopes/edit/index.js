import Controller from "@ember/controller";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class ScopesEditIndexController extends Controller {
  @service emeisOptions;
  @service intl;
  @service router;
  @service store;

  get metaFields() {
    return this.emeisOptions.metaFields?.scope;
  }

  get allScopes() {
    return this.store.peekAll("scope");
  }

  @action
  updateModel(model, formElements) {
    model.name = formElements.name.value;
    model.description = formElements.description.value;

    return model;
  }
}
