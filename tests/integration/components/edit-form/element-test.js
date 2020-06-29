import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Component | edit-form/element", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    this.set("label", "Hey");

    await render(hbs`
      <EditForm::Element @label={{this.label}}>
        Text
      </EditForm::Element>
    `);

    assert.dom("label").hasText(this.label);
    assert.dom(".uk-form-controls").hasText("Text");
  });
});
