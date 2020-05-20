import Model, { attr, belongsTo, hasMany } from "@ember-data/model";

export default class GroupModel extends Model {
  @attr("string") name;
  @attr("string") description;

  @belongsTo("scope", { inverse: "children" }) parent;
  @hasMany("scope", { inverse: "parent" }) children;
}
