import { attr, belongsTo, hasMany } from "@ember-data/model";

import localizedAttr from "ember-emeis/decorators/localized-attr";
import LocalizedModel from "ember-emeis/models/localized";

export default class ScopeModel extends LocalizedModel {
  @localizedAttr name;
  @localizedAttr "full-name";
  @localizedAttr description;
  @attr level;
  @attr meta;

  @belongsTo("scope", { inverse: "children", async: false }) parent;
  @hasMany("scope", { inverse: "parent", async: false }) children;
  @hasMany("acl") acls;

  findParents() {
    const anchestors = [];
    let node = this;
    while (node.parent) {
      anchestors.push(node.parent);
      node = node.parent;
    }
    return anchestors;
  }
}
