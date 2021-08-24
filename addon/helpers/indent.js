import { helper } from "@ember/component/helper";

export default helper(function indent([depth]) {
  return "\xa0".repeat(depth * 3);
});
