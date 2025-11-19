import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "dummy/tests/helpers";
import { hbs } from "ember-cli-htmlbars";
import { module, test } from "qunit";

module("Integration | Helper | optional-translate", function (hooks) {
  setupRenderingTest(hooks, undefined, { foo: "translation of foo" });

  test("it translates if the translation exists", async function (assert) {
    await render(hbs`{{optional-translate "foo"}}`, { owner: this.engine });

    assert.dom(this.element).hasText("translation of foo");
  });
  test("it falls back to the translation key otherwise", async function (assert) {
    await render(hbs`{{optional-translate "baz"}}`, { owner: this.engine });

    assert.dom(this.element).hasText("baz");
  });
});
