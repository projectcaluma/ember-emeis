import { visit, currentURL, click } from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | nav", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test("nav-bar", async function (assert) {
    assert.expect(9);

    await visit("/");

    assert.equal(currentURL(), "/users");
    assert.dom("[data-test-nav-users]").exists();
    assert.dom("[data-test-nav-scopes]").exists();
    assert.dom("[data-test-nav-permissions]").exists();
    assert.dom("[data-test-nav-roles]").exists();

    await click("[data-test-nav-users] a");
    assert.equal(currentURL(), "/users");

    await click("[data-test-nav-scopes] a");
    assert.equal(currentURL(), "/scopes");

    await click("[data-test-nav-permissions] a");
    assert.equal(currentURL(), "/permissions");

    await click("[data-test-nav-roles] a");
    assert.equal(currentURL(), "/roles");
  });
});
