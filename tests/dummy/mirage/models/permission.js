import { Model, hasMany } from "miragejs";

export default Model.extend({
  roles: hasMany("role"),
});
