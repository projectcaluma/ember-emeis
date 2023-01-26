import { render } from "@ember/test-helpers";
import { setupRenderingTest } from "dummy/tests/helpers";
import { hbs } from "ember-cli-htmlbars";
import { module, test } from "qunit";

module("Integration | Component | section-title", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    const intl = this.owner.lookup("service:intl");
    intl.set("locale", "en");

    await render(hbs`<SectionTitle @model="roles" />`);

    assert.dom("h2").hasText("Roles");
    assert.dom("[data-test-new]").hasText("Add Role");
  });
});
