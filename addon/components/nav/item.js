import { inject as service } from "@ember/service";
import Component from "@glimmer/component";

export default class NavItemComponent extends Component {
  @service hostRouter;
  @service emeisOptions;

  get isActive() {
    return this.hostRouter.currentRoute.name.includes(this.args.route);
  }

  get isVisible() {
    return (
      !this.emeisOptions.navigationEntries ||
      this.emeisOptions.navigationEntries.includes(this.args.route)
    );
  }
}
