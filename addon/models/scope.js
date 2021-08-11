import { attr, belongsTo, hasMany } from "@ember-data/model";

import localizedAttr from "ember-emeis/decorators/localized-attr";
import LocalizedModel from "ember-emeis/models/localized";

export default class ScopeModel extends LocalizedModel {
  @localizedAttr name;
  @localizedAttr description;
  @attr level;

  @belongsTo("scope", { inverse: "children" }) parent;
  @hasMany("scope", { inverse: "parent" }) children;
  @hasMany("acl") acls;
}
