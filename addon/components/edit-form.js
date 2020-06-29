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

  get listViewRouteName() {
    return (
      this.args.listViewRouteName ||
      `${this.parentRouteName}.index`.replace("ember-emeis.", "")
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
        this.router.replaceWith(`${this.parentRouteName}.edit`, model);
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
    // I dont really understand why this replaceWith needs the "ember-emeis." prefix and the onw in save does not :/.
    this.router.replaceWith(`ember-emeis.${this.listViewRouteName}`);
  }
}
