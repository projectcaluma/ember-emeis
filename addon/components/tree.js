import { isArray } from "@ember/array";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class TreeComponent extends Component {
  @service store;

  @tracked filterValue;

  @tracked filtered;

  get items() {
    if (!this.filterValue) return this.args.items;
    return this.filtered;
  }

  get hasFilter() {
    return !!this.filterValue;
  }

  get expandedItems() {
    return this.args.activeItem?.findParents();
  }

  @action
  filter(event) {
    const filterItems = (
      items,
      searchTerm = this.filterValue,
      includedKeys = ["name", "description"]
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
}
