import { helper } from "@ember/component/helper";

export default helper(function evaluateToBoolean([expression, ...parameter]) {
  if (typeof expression === "boolean") {
    return expression;
  }
  if (typeof expression === "function") {
    return expression(...parameter);
  }
  if (typeof expression === "string") {
    return expression === "true";
  }
  return false;
});
