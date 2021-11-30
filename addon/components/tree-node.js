import { action } from "@ember/object";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class TreeNodeComponent extends Component {
  @tracked
  expandedByUser = null;

  @action
  toggle() {
    console.log(this.expandedByUser);
    this.expandedByUser = !this.expandedByUser;
  }

  get expandedDefault() {
    return (
      this.args.scope.level === 0 ||
      this.args.activeScope?.id === this.args.scope.id
    );
  }

  get expanded() {
    return this.expandedByUser !== null
      ? this.expandedByUser
      : this.expandedDefault;
  }
}
