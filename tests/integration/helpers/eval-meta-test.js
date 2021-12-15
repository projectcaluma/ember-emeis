import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Helper | eval-meta", function (hooks) {
  setupRenderingTest(hooks);

  test("it evaluates strings", async function (assert) {
    this.set("inputValue", "1234");

    await render(hbs`{{eval-meta this.inputValue}}`);

    assert.strictEqual(this.element.textContent, "false");

    this.set("inputValue", "true");
    assert.strictEqual(this.element.textContent, "true");
  });

  test("it evaluates booleans", async function (assert) {
    this.set("inputValue", true);

    await render(hbs`{{eval-meta this.inputValue}}`);

    assert.strictEqual(this.element.textContent, "true");

    this.set("inputValue", false);
    assert.strictEqual(this.element.textContent, "false");
  });

  test("it evaluates functions", async function (assert) {
    this.set("inputValue", () => true);

    await render(hbs`{{eval-meta this.inputValue}}`);

    assert.strictEqual(this.element.textContent, "true");

    this.set("inputValue", () => false);
    assert.strictEqual(this.element.textContent, "false");
  });
});
