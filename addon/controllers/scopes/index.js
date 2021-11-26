import PaginationController from "ember-emeis/-private/controllers/pagination";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";

export default class ScopesIndexController extends PaginationController {
  @service emeisOptions;
  @service intl;
  @service store;

  get metaFields() {
    return this.emeisOptions.metaFields?.scope;
  }

  @action
  updateModel(model, formElements) {
    model.name = formElements.name.value;
    model.description = formElements.description.value;

    return model;
  }

  get queryParamsfilter() {
    return { scope: this.model.id };
  }
}
