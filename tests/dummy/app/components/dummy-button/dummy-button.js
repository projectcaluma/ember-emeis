import { action } from "@ember/object";
import Component from "@glimmer/component";

export default class DummyButtonComponent extends Component {
  @action
  callBack(model) {
    console.warn("This is your current model", model);

    // this stuff is for (integration) testing purposes only
    document
      .querySelector("[data-test-custom-component]")
      .setAttribute("data-test-action-triggered", true);
  }
}
