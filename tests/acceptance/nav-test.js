import { visit, currentURL, click } from "@ember/test-helpers";
import { setupApplicationTest } from "dummy/tests/helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { module, test } from "qunit";

module("Acceptance | nav", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("nav-bar", async function (assert) {
    assert.expect(9);

    await visit("/");

    assert.strictEqual(currentURL(), "/users");
    assert.dom("[data-test-nav-users]").exists();
    assert.dom("[data-test-nav-scopes]").exists();
    assert.dom("[data-test-nav-permissions]").exists();
    assert.dom("[data-test-nav-roles]").exists();

    await click("[data-test-nav-users] a");
    assert.strictEqual(currentURL(), "/users");

    await click("[data-test-nav-scopes] a");
    assert.strictEqual(currentURL(), "/scopes");

    await click("[data-test-nav-permissions] a");
    assert.strictEqual(currentURL(), "/permissions");

    await click("[data-test-nav-roles] a");
    assert.strictEqual(currentURL(), "/roles");
  });
});
