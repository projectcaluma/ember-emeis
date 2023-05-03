import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { restartableTask, lastValue, timeout } from "ember-concurrency";

import { handleTaskErrors } from "ember-emeis/-private/decorators";

export default class RelationshipSelectComponent extends Component {
  @service notification;
  @service intl;
  @service store;

  @lastValue("fetchModels") models;

  get searchEnabled() {
    return this.models && this.args.modelName && this.models.length > 5;
  }

  @restartableTask
  @handleTaskErrors
  *fetchModels(search) {
    if (this.args.model) {
      return this.args.model;
    }
    if (typeof search === "string") {
      yield timeout(500);
      return yield this.store.query(this.args.modelName, {
        filter: { search },
      });
    }

    // For some reason the this.model.lenght is 1 and this.model.content.length is 2
    // It looks like an issue with the way findAll retrieves all cached first before making a request.
    // The {reload: true} fixes this since the cached are ignored.
    return yield this.store.findAll(this.args.modelName, { reload: true });
  }
}
