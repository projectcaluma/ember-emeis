import { action } from "@ember/object";
import { inject as service } from "@ember/service";

import PaginationController from "ember-emeis/-private/controllers/pagination";

export default class ScopesEditIndexController extends PaginationController {
  @service emeisOptions;
  @service intl;
  @service router;
  @service store;

  get queryParamsfilter() {
    return { scope: this.model?.id };
  }

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

  @action
  setParent(scope) {
    this.model.parent = scope;
  }
}
