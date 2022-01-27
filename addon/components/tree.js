import { isArray } from "@ember/array";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class TreeComponent extends Component {
  @service store;

  @tracked filterValue;
  @tracked filtered;

  get hasFilter() {
    return !!this.filterValue;
  }

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
      return expanded.map((item) => item.id);
    }
    return this.args.activeItem?.findParents
      ? this.args.activeItem?.findParents().map((item) => item.id)
      : [];
  }

  @action
  filter(event) {
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
  filterItemList(id) {
    return this.expandedItems.includes(id);
  }
}
