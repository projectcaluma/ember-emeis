import { inject as service } from "@ember/service";
import Component from "@glimmer/component";

export default class NavItemComponent extends Component {
  @service router;
  @service emeisOptions;

  get isActive() {
    return this.router.currentRoute.name.includes(this.args.route);
  }

  get isVisible() {
    return (
      !this.emeisOptions.navigationEntries ||
      this.emeisOptions.navigationEntries.includes(this.args.route)
    );
  }
}
