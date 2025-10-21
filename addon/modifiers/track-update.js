import { modifier } from "ember-modifier";

export default modifier(function trackUpdate(element, [callback, ...args]) {
  callback?.(element, ...args);
});
