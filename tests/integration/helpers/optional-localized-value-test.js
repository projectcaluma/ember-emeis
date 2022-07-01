import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupIntl } from "ember-intl/test-support";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Helper | optional-localized-value", function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, ["en"]);

  test("it renders a localized field", async function (assert) {
    this.set("inputValue", { en: "english", de: "deutsch" });

    await render(hbs`{{optional-localized-value this.inputValue}}`);

    assert.dom(this.element).hasText("english");
  });
  test("it renders a unlocalized field", async function (assert) {
    this.set("inputValue", "1234-string");

    await render(hbs`{{optional-localized-value this.inputValue}}`);

    assert.dom(this.element).hasText("1234-string");
  });
});
