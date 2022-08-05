import { assert } from "@ember/debug";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { task } from "ember-concurrency";
import { trackedTask } from "ember-resources/util/ember-concurrency";

export default class MetaFieldComponent extends Component {
  @service intl;

  constructor(...args) {
    super(...args);

    assert("Must pass a valid field argument", this.args.field);
    assert("Must pass a valid model argument", this.args.model);
  }

  async evaluateToBoolean(expression) {
    if (typeof expression === "boolean") {
      return expression;
    }
    if (typeof expression === "function") {
      return await expression(this.args.model);
    }
    if (typeof expression === "string") {
      return expression === "true";
    }
    return false;
  }

  visible = trackedTask(this, this.evalVisible, () => [
    this.args.field.visible,
  ]);
  readOnly = trackedTask(this, this.evalReadOnly, () => [
    this.args.field.readOnly,
  ]);
  options = trackedTask(this, this.evalOptions, () => [
    this.args.field.options,
  ]);

  @task
  *evalVisible(visible) {
    return yield this.evaluateToBoolean(visible);
  }

  @task
  *evalReadOnly(readOnly) {
    return yield this.evaluateToBoolean(readOnly);
  }

  @task
  *evalOptions(options) {
    // options may be a (async) function or a complex property
    if (typeof options !== "function") {
      return options;
    }
    return yield options(this.args.model);
  }

  @action
  updateMetaField(field, model, optionOrEvent) {
    const value = optionOrEvent?.target?.value ?? optionOrEvent?.value;
    model.metainfo = { ...model.metainfo, [field.slug]: value };
    model.notifyPropertyChange("metainfo");
  }
}
