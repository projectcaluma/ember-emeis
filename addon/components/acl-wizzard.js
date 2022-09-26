import { action } from "@ember/object";
import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";

const DEFAULT_SORT = {
  scope: "full_name",
};

export default class AclWizzardComponent extends Component {
  @tracked modelToSelect;
  @tracked user;
  @tracked role;
  @tracked scope;

  fields = {
    user: ["username", "fullName", "email"],
    scope: ["fullName", "description"],
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

  @action
  openModel(model) {
    this.modelToSelect = model;
    this.sort = DEFAULT_SORT[model];
  }
}
