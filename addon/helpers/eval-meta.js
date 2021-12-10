import { helper } from "@ember/component/helper";

export default helper(function evalMeta(argsProxy) {
  const expression = argsProxy[0];
  if (typeof expression === "boolean") return expression;
  if (typeof expression === "function") return expression();
  if (typeof expression === "string") return expression === "true";
  return false;
});
