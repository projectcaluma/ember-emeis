import { attr, hasMany } from "@ember-data/model";

import localizedAttr from "ember-emeis/decorators/localized-attr";
import LocalizedModel from "ember-emeis/models/localized";

export default class UserModel extends LocalizedModel {
  @attr username;
  @attr firstName;
  @attr lastName;
  @attr email;
  @attr phone;
  @attr language;
  @attr address;
  @localizedAttr city;
  @attr zip;
  @attr metainfo;
  @attr isActive;

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  @hasMany("acl") acls;
}
