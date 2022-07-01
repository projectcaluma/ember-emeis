import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { task } from "ember-concurrency";
import { singularize } from "ember-inflector";

import { confirmTask } from "../decorators/confirm-task";

import { handleTaskErrors } from "ember-emeis/-private/decorators";

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
    return singularize(this.relativeParentRouteName.split(".")[0]);
  }

  get customComponent() {
    return this.emeisOptions[this.modelName]?.customComponent;
  }

  get modelHasActiveState() {
    return this.args.model?.isActive !== undefined;
  }

  get canChangeActiveState() {
    const option =
      this.emeisOptions[this.args.model?._internalModel?.modelName]?.actions
        ?.deactivate;
    const func = option?.func || option;
    return typeof func === "function" ? func(this.args.model) : true;
  }

  get canDeleteModel() {
    const option =
      this.emeisOptions[this.args.model?._internalModel?.modelName]?.actions
        ?.delete;
    const func = option?.func || option;
    return typeof func === "function" ? func(this.args.model) : true;
  }

  get deactivateLabelOverride() {
    const label =
      this.emeisOptions[this.args.model?._internalModel?.modelName]?.actions
        ?.deactivate?.label;
    if (typeof label === "function") {
      return label(this.args.model);
    } else if (label) {
      return label;
    }
    return this.intl.t(
      `emeis.form.${this.args.model.isActive ? "deactivate" : "activate"}`
    );
  }

  get deleteLabelOverride() {
    const label =
      this.emeisOptions[this.args.model?._internalModel?.modelName]?.actions
        ?.delete?.label;
    if (typeof label === "function") {
      return label(this.args.model);
    } else if (label) {
      return label;
    }
    return this.intl.t("emeis.form.delete");
  }

  @task
  @handleTaskErrors({ errorMessage: "emeis.form.save-error" })
  *toggleActiveState() {
    const activeState = this.args.model.isActive;
    this.args.model.isActive = !activeState;
    yield this.args.model.save();

    this.notification.success(
      this.intl.t(
        activeState
          ? "emeis.form.deactivate-success"
          : "emeis.form.activate-success"
      )
    );
  }

  @task
  @handleTaskErrors({ errorMessage: "emeis.form.save-error" })
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
  @confirmTask({ message: "emeis.form.confirmEntryDelete" })
  @handleTaskErrors({ errorMessage: "emeis.form.delete-error" })
  *delete() {
    yield this.args.model.destroyRecord();
    this.notification.success(this.intl.t("emeis.form.delete-success"));

    this.router.replaceWith(
      `${this.topLevelRouteName}.${this.relativeListViewRouteName}`
    );
  }
}
