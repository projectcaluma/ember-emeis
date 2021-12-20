import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupIntl } from "ember-intl/test-support";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Helper | optional-translate", function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, { foo: "translation of foo" });

  test("it translates if the translation exists", async function (assert) {
    await render(hbs`{{optional-translate "foo"}}`);

    assert.dom(this.element).hasText("translation of foo");
  });
  test("it falls back to the translation key otherwise", async function (assert) {
    await render(hbs`{{optional-translate "baz"}}`);

    assert.dom(this.element).hasText("baz");
  });
});
