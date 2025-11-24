import { Model, belongsTo } from "miragejs";

export default Model.extend({
  role: belongsTo(),
  scope: belongsTo(),
  user: belongsTo(),
});
