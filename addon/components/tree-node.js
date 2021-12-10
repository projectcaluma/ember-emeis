import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class TreeNodeComponent extends Component {
  @tracked expandedByUser = null;
  @service router;

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
      this.router.transitionTo(this.args.itemRoute, this.args.item.id);
    }
  }

  get expandedDefault() {
    return (
      this.args.item.level === 0 ||
      this.args.activeItem?.id === this.args.item.id
    );
  }

  get expanded() {
    return (
      !this.args.flat &&
      this.args.item.children &&
      (this.args.expandedItems?.find((item) => item.id === this.args.item.id) ||
        (this.expandedByUser !== null
          ? this.expandedByUser
          : this.expandedDefault))
    );
  }
}
