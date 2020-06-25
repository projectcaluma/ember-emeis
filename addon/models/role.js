import { attr, hasMany } from "@ember-data/model";

import localizedAttr from "ember-emeis/decorators/localized-attr";
import LocalizedModel from "ember-emeis/models/localized";

export default class RoleModel extends LocalizedModel {
  @attr slug;
  @localizedAttr name;
  @localizedAttr description;

  @hasMany("permission") permissions;
  @hasMany("acl") acls;
}
