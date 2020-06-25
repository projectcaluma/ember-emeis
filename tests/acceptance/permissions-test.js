import { visit, currentURL } from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | permissions", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("list view /permissions", async function (assert) {
    assert.expect(6);

    const permission = this.server.createList("permission", 10)[0];

    await visit("/permissions");

    assert.equal(currentURL(), "/permissions");

    assert.dom("[data-test-permission-name]").exists({ count: 10 });
    assert
      .dom(`[data-test-permission-name="${permission.id}"]`)
      .hasText(permission.name.en);
    assert
      .dom(`[data-test-permission-slug="${permission.id}"]`)
      .hasText(permission.slug);
    assert
      .dom(`[data-test-permission-desc="${permission.id}"]`)
      .hasText(permission.description.en);
    assert
      .dom(`[data-test-permission-name="${permission.id}"] a`)
      .hasAttribute("href", `/permissions/${permission.id}`);
  });
});
