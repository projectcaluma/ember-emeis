import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { task } from "ember-concurrency";

import handleModelErrors from "ember-emeis/decorators/handle-model-errors";

export default class EditFormComponent extends Component {
  @service intl;
  @service notification;
  @service router;
  @service emeisOptions;

  get parentRouteName() {
    return this.router.currentRoute.parent.name;
  }

  get topLevelRouteName() {
    return this.router.currentRoute.name.split(".").shift();
  }

  get relativeParentRouteName() {
    // Remove the top level route
    return this.router.currentRoute.parent.name.split(".").slice(1).join(".");
  }

  get listViewRouteName() {
    return this.args.listViewRouteName
      ? `${this.parentRouteName}.${this.args.listViewRouteName}`
      : `${this.parentRouteName}.index`;
  }

  get editViewRouteName() {
    return `${this.parentRouteName}.edit`;
  }

  get relativeListViewRouteName() {
    return (
      this.args.listViewRouteName || `${this.relativeParentRouteName}.index`
    );
  }

  get modelName() {
    return this.relativeParentRouteName.split(".")[0];
  }

  get customButtons() {
    return this.emeisOptions.customButtons?.[this.modelName];
  }

  @action
  customAction(button) {
    if (typeof button.callback !== "function") {
      this.notification.danger(
        this.intl.t("emeis.form.custom-button-action-error")
      );
    }
    button.callback();
  }

  @task
  @handleModelErrors({ errorMessage: "emeis.form.save-error" })
  *save(event) {
    event.preventDefault();

    const model = this.args.updateModel(this.args.model, this.form.elements);
    const isNew = model.isNew;

    yield model.save();

    this.notification.success(this.intl.t("emeis.form.save-success"));

    if (isNew) {
      this.router.replaceWith(this.editViewRouteName, model);
    }
  }

  @task
  @handleModelErrors({ errorMessage: "emeis.form.delete-error" })
  *delete() {
    yield this.args.model.destroyRecord();
    this.notification.success(this.intl.t("emeis.form.delete-success"));

    this.router.replaceWith(
      `${this.topLevelRouteName}.${this.relativeListViewRouteName}`
    );
  }
}
