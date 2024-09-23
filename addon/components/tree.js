import { isArray } from "@ember/array";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { isTesting, macroCondition } from "@embroider/macros";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { timeout, restartableTask } from "ember-concurrency";
import { cached } from "tracked-toolbox";

export default class TreeComponent extends Component {
  @service store;

  @tracked filterValue;
  @tracked filtered;

  get hasFilter() {
    return !!this.filterValue;
  }

  @cached
  get expandedItems() {
    if (this.filterValue && this.filtered) {
      const expanded = [...this.filtered];
      this.filtered.forEach((item) => {
        if (item.findParents) {
          item.findParents().forEach((item) => {
            if (!expanded.find((existing) => existing.id === item.id)) {
              expanded.push(item);
            }
          });
        }
        // we need the children in the list of expanded items, so we can expand the "searched" items.
        item.children.forEach((child) => expanded.push(child));
      });
      return expanded;
    }
    const rootNodes = this.args.items?.filter((i) => i.level === 0);
    return this.args.activeItem?.findParents
      ? this.args.activeItem?.findParents()
      : rootNodes.length === 1
      ? rootNodes
      : [];
  }

  @restartableTask
  *filter(event) {
    if (macroCondition(!isTesting())) {
      yield timeout(100);
    }

    const filterItems = (
      items,
      searchTerm = this.filterValue,
      includedKeys = ["name"]
    ) => {
      if (!searchTerm || !items || !isArray(items)) {
        return [];
      }
      const ownMatches = items.filter((item) =>
        includedKeys.find((key) =>
          item[key]?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );

      const childMatches = items
        .filter((item) => item.children)
        .flatMap((item) =>
          filterItems(item.children, searchTerm, includedKeys)
        );
      return [...ownMatches, ...childMatches];
    };

    this.filtered = filterItems(this.args.items, event.target.value);
  }

  @action
  filterItemList(item) {
    return this.expandedItems.find(({ id }) => id === item);
  }
}
