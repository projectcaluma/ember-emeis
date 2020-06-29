import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Component | nav", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    await render(hbs`
      <Nav>
        <li>Nav 1</li>
        <li>Nav 2</li>
      </Nav>
    `);

    assert.dom("ul li").exists({ count: 2 });
  });
});
