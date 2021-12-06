import { action } from "@ember/object";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class TreeNodeComponent extends Component {
  @tracked
  expandedByUser = null;

  @action
  toggle() {
    if (this.expandedByUser === null) {
      this.expandedByUser = !this.expanded;
    } else {
      this.expandedByUser = !this.expandedByUser;
    }
  }

  get expandedDefault() {
    return (
      this.args.item.level === 0 ||
      this.args.activeItem?.id === this.args.item.id
    );
  }

  get expanded() {
    return this.expandedByUser !== null
      ? this.expandedByUser
      : this.expandedDefault;
  }
}
