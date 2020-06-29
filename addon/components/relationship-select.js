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

  @restartableTask
  @handleModelErrors
  *fetchModels(search) {
    yield timeout(200);
    return yield typeof search === "string"
      ? this.store.query(this.args.modelName, { filter: { search } })
      : this.store.findAll(this.args.modelName);
  }
}
