import { visit, currentURL } from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

module("Acceptance | users", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupIntl(hooks, "en");

  test("list view /users", async function (assert) {
    assert.expect(6);

    const user = this.server.createList("user", 10)[0];

    await visit("/users");

    assert.equal(currentURL(), "/users");

    assert.dom("[data-test-user-username]").exists({ count: 10 });
    assert.dom(`[data-test-user-username="${user.id}"]`).hasText(user.username);
    assert
      .dom(`[data-test-user-full-name="${user.id}"]`)
      .hasText(`${user.firstName} ${user.lastName}`);
    assert.dom(`[data-test-user-email="${user.id}"]`).hasText(user.email);
    assert
      .dom(`[data-test-user-username="${user.id}"] a`)
      .hasAttribute("href", `/users/${user.id}`);
  });
});
