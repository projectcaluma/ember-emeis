import { Model, belongsTo, hasMany } from "miragejs";

export default Model.extend({
  acls: hasMany("acl"),
  parent: belongsTo("scope", { inverse: "children" }),
  children: hasMany("scope", { inverse: "parent" }),
});
