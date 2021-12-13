import { helper } from "@ember/component/helper";

export default helper(function evalMeta([expression, model]) {
  if (typeof expression === "boolean") return expression;
  if (typeof expression === "function") return expression(model);
  if (typeof expression === "string") return expression === "true";
  return false;
});
