import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { task } from "ember-concurrency-decorators";

import handleModelErrors from "ember-emeis/decorators/handle-model-errors";

export default class EditFormComponent extends Component {
  @service intl;
  @service notification;
  @service router;

  get parentRouteName() {
    return this.router.currentRoute.parent.name;
  }

  get relativeParentRouteName() {
    // Remove the top level route
    return this.router.currentRoute.parent.name.split(".").slice(1).join(".");
  }

  get listViewRouteName() {
    return this.args.listViewRouteName || `${this.parentRouteName}.index`;
  }

  get editViewRouteName() {
    return `${this.parentRouteName}.edit`;
  }

  get relativeListViewRouteName() {
    return (
      this.args.listViewRouteName.split(".").slice(1).join(".") ||
      `${this.relativeParentRouteName}.index`
    );
  }

  @task
  *save(event) {
    try {
      event.preventDefault();

      const model = this.args.updateModel(this.args.model, this.form.elements);
      const isNew = model.isNew;

      yield model.save();

      this.notification.success(this.intl.t("emeis.form.save-success"));

      if (isNew) {
        this.router.replaceWith(this.editViewRouteName, model);
      }
    } catch (exception) {
      this.notification.danger(this.intl.t("emeis.form.save-error"));
    }
  }

  @task
  @handleModelErrors({ errorMessage: "emeis.form.delete-error" })
  *delete() {
    yield this.args.model.destroyRecord();
    this.notification.success(this.intl.t("emeis.form.delete-success"));
    this.router.replaceWith(this.listViewRouteName);
  }
}
