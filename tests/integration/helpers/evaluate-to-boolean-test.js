import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Helper | evaluateToBoolean", function (hooks) {
  setupRenderingTest(hooks);

  test("evaluates booleans (true)", async function (assert) {
    this.set("inputValue", true);

    await render(
      hbs`{{if (evaluate-to-boolean this.inputValue) "true" "false"}}`
    );

    assert.dom(this.element).hasText("true");
  });

  test("evaluates booleans (false)", async function (assert) {
    this.set("inputValue", false);

    await render(
      hbs`{{if (evaluate-to-boolean this.inputValue) "true" "false"}}`
    );

    assert.dom(this.element).hasText("false");
  });

  test("evaluates string (true)", async function (assert) {
    this.set("inputValue", "true");

    await render(
      hbs`{{if (evaluate-to-boolean this.inputValue) "true" "false"}}`
    );

    assert.dom(this.element).hasText("true");
  });

  test("evaluates string (false)", async function (assert) {
    this.set("inputValue", "false");

    await render(
      hbs`{{if (evaluate-to-boolean this.inputValue) "true" "false"}}`
    );

    assert.dom(this.element).hasText("false");
  });

  test("evaluates function (true)", async function (assert) {
    this.set("inputValue", () => true);

    await render(
      hbs`{{if (evaluate-to-boolean this.inputValue) "true" "false"}}`
    );

    assert.dom(this.element).hasText("true");
  });

  test("evaluates function (false)", async function (assert) {
    this.set("inputValue", () => false);

    await render(
      hbs`{{if (evaluate-to-boolean this.inputValue) "true" "false"}}`
    );

    assert.dom(this.element).hasText("false");
  });

  test("evaluates function with parameter (false)", async function (assert) {
    this.set("inputValue", (p) => p === 1);

    await render(
      hbs`{{if (evaluate-to-boolean this.inputValue 2) "true" "false"}}`
    );

    assert.dom(this.element).hasText("false");
  });

  test("evaluates function with multiple parameters (true)", async function (assert) {
    this.set("inputValue", (p1, p2) => p1 !== p2);

    await render(
      hbs`{{if (evaluate-to-boolean this.inputValue 1 "a") "true" "false"}}`
    );

    assert.dom(this.element).hasText("true");
  });
});
