import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "dummy/tests/helpers";
import { hbs } from "ember-cli-htmlbars";
import { module, test } from "qunit";

module("Integration | Helper | indent", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    this.set("inputValue", 3);

    await render(hbs`{{indent this.inputValue}}`);

    assert.strictEqual(this.element.textContent, "\xa0".repeat(9));
  });
});
