import { Model, hasMany } from "miragejs";

export default Model.extend({
  acls: hasMany("acl"),
});
