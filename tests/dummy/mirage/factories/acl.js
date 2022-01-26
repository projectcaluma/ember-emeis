import { Factory, association } from "miragejs";

export default Factory.extend({
  user: association(),
  scope: association(),
  role: association(),
});
