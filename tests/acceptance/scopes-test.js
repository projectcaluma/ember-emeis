import { visit, currentURL } from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | scopes", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupIntl(hooks, ["en"]);

  test("list view /scopes", async function (assert) {
    assert.expect(5);

    const scope = this.server.createList("scope", 10)[0];

    await visit("/scopes");

    assert.equal(currentURL(), "/scopes");

    assert.dom("[data-test-scope-name]").exists({ count: 10 });
    assert.dom(`[data-test-scope-name="${scope.id}"]`).hasText(scope.name.en);
    assert
      .dom(`[data-test-scope-desc="${scope.id}"]`)
      .hasText(scope.description.en);
    assert
      .dom(`[data-test-scope-name="${scope.id}"] a`)
      .hasAttribute("href", `/scopes/${scope.id}`);
  });
});
