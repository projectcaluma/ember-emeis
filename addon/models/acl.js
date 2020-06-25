import Model, { belongsTo } from "@ember-data/model";

export default class AclModel extends Model {
  @belongsTo("user") user;
  @belongsTo("scope") scope;
  @belongsTo("role") role;
}
