import { action } from "@ember/object";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

export default class AclWizzardComponent extends Component {
  @tracked modelToSelect;
  @tracked user;
  @tracked role;
  @tracked scope;

  fields = {
    user: ["username", "fullName", "email"],
    scope: ["name", "description"],
    role: ["name", "description"],
  };

  get isValidAcl() {
    return this.user && this.role && this.scope;
  }

  constructor(owner, args) {
    super(owner, args);

    this.user = args.user;
    this.role = args.role;
    this.scope = args.scope;
  }

  @action
  selectModel(model) {
    this[this.modelToSelect] = model;
    this.modelToSelect = null;
  }
}
