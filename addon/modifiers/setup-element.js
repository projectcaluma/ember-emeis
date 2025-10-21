import { modifier } from "ember-modifier";

export default modifier(function setupElement(element, [callback]) {
  callback?.(element);

  return () => {};
});
