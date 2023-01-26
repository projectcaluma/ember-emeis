import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class TreeNodeComponent extends Component {
  @tracked expandedByUser = null;
  @service hostRouter;

  @action
  toggle() {
    if (this.expandedByUser === null) {
      this.expandedByUser = !this.expanded;
    } else {
      this.expandedByUser = !this.expandedByUser;
    }

    if (
      this.args.activeItem
        ?.findParents()
        .find((parent) => parent.id === this.args.item.id)
    ) {
      this.hostRouter.transitionTo(
        this.hostRouter.currentRoute.name,
        this.args.item.id
      );
    }
  }

  get expandedDefault() {
    return this.args.activeItem?.id === this.args.item.id;
  }

  get expanded() {
    return (
      this.args.filteredItems?.includes(this.args.item) ||
      (this.args.item.children &&
        (this.args.expandedItems?.includes(this.args.item) ||
          (this.expandedByUser !== null
            ? this.expandedByUser
            : this.expandedDefault)))
    );
  }

  get children() {
    const item = this.args.item;
    if (
      this.args.filteredItems &&
      !this.args.filteredItems?.includes(item) &&
      this.args.expandedItems?.includes(item)
    ) {
      return item.children.filter((child) =>
        this.args.expandedItems.includes(child)
      );
    }
    return item.children;
  }
}
