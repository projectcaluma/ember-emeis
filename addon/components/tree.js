import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { lastValue, restartableTask } from "ember-concurrency";

export default class TreeComponent extends Component {
  @service store;

  @tracked
  filterValue;

  @lastValue("filter") filtered;
  @lastValue("findAnchestors") expandedItems;

  get items() {
    if (!this.filterValue) return this.args.items;
    return this.filtered;
  }

  @restartableTask
  *findAnchestors() {
    return yield this.findParents(this.args.activeItem);
  }

  async findParents(item) {
    const reducer = async (anchestors, item) => {
      if (item) {
        const parent = await item.parent;
        if (parent) {
          anchestors.push(parent.id);
          return await reducer(anchestors, parent);
        }
      }
      return anchestors;
    };
    const res = await reducer([], item);
    return res;
  }

  @restartableTask
  *filter(event) {
    const filterItems = (
      items,
      value = this.filterValue,
      includedKeys = ["name", "description"],
      results = []
    ) => {
      if (value && items && items.filter && items.forEach) {
        const ffn = (i) => {
          for (const key of includedKeys) {
            if (i[key] && i[key].toLowerCase().includes(value.toLowerCase())) {
              return true;
            }
          }
          return false;
        };
        items.filter(ffn).map((i) => results.push(i));
        items.forEach((i) =>
          filterItems(i.children, value, includedKeys, results)
        );
      }
      return results;
    };

    return yield filterItems(this.args.items, event.target.value);
  }
}
