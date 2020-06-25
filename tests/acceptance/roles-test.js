import { visit, currentURL } from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | roles", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("list view /roles", async function (assert) {
    assert.expect(6);

    const role = this.server.createList("role", 10)[0];

    await visit("/roles");

    assert.equal(currentURL(), "/roles");

    assert.dom("[data-test-role-name]").exists({ count: 10 });
    assert.dom(`[data-test-role-name="${role.id}"]`).hasText(role.name.en);
    assert.dom(`[data-test-role-slug="${role.id}"]`).hasText(role.slug);
    assert
      .dom(`[data-test-role-desc="${role.id}"]`)
      .hasText(role.description.en);
    assert
      .dom(`[data-test-role-name="${role.id}"] a`)
      .hasAttribute("href", `/roles/${role.id}`);
  });
});
