import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { timeout } from "ember-concurrency";
import { restartableTask, lastValue } from "ember-concurrency-decorators";

import handleModelErrors from "ember-emeis/decorators/handle-model-errors";

export default class RelationshipSelectComponent extends Component {
  @service notification;
  @service intl;
  @service store;

  @lastValue("fetchModels") models;

  get searchEnabled() {
    return this.models.length > 5;
  }

  @restartableTask
  @handleModelErrors
  *fetchModels(search) {
    if (typeof search === "string") {
      yield timeout(500);
      return yield this.store.query(this.args.modelName, {
        filter: { search },
      });
    }

    return this.store.findAll(this.args.modelName);
  }
}
