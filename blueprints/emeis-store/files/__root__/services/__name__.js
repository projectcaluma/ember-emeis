import Store from "@ember-data/store";

export default class <%= classifiedModuleName %>Store extends Store {
  adapter = "<%= dasherizedModuleName %>";
}
