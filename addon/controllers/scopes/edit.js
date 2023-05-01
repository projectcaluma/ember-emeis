import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { localCopy } from "tracked-toolbox";

import PaginationController from "ember-emeis/-private/controllers/pagination";

export default class ScopesEditIndexController extends PaginationController {
  @service emeisOptions;
  @service notification;
  @service intl;
  @service router;
  @service store;

  @localCopy("model.parent") parent;

  get queryParamsfilter() {
    return { scope: this.model?.id };
  }

  get metaFields() {
    return this.emeisOptions.scope?.metaFields;
  }

  get childScopeIds() {
    return this.model?.children.map((s) => s.id) ?? [];
  }

  get allOtherScopes() {
    return this.store
      .peekAll("scope")
      .filter(
        (scope) =>
          scope.id !== this.model?.id && !this.childScopeIds.includes(scope.id)
      );
  }

  @action
  updateModel(model, formElements) {
    model.name = formElements.name.value;
    model.description = formElements.description.value;
    if (
      this.parent
        .findParents()
        .map((scope) => scope.id)
        .includes(this.model.id)
    ) {
      this.parent = model.parent;
      this.notification.warning(
        this.intl.t("emeis.form.invalid-scope-assignment-warning")
      );
    } else {
      model.parent = this.parent;
    }

    return model;
  }

  @action
  setParent(scope) {
    this.parent = scope;
  }
}
