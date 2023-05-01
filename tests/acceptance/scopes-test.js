import {
  visit,
  currentURL,
  fillIn,
  click,
  waitFor,
  waitUntil,
  settled,
} from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupIntl } from "ember-intl/test-support";
import { selectChoose } from "ember-power-select/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

import setupRequestAssertions from "./../helpers/assert-request";

module("Acceptance | scopes", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupRequestAssertions(hooks);
  setupIntl(hooks, ["en"]);

  test("tree view /scopes", async function (assert) {
    assert.expect(3);

    const root = this.server.create("scope");
    const level1 = this.server.createList("scope", 3, {
      level: 1,
      parent: root,
    });
    this.server.createList("scope", 2, { level: 2, parent: level1[0] });

    await visit("/scopes");
    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();

    assert.strictEqual(currentURL(), `/scopes/${root.id}?page=1`);

    // only root and first level is shown by default
    assert.dom("[data-test-node-id]").exists({ count: 4 });
    assert
      .dom(`[data-test-node-id="${root.id}"]`)
      .hasAttribute("href", `/scopes/${root.id}`);
  });

  test("detail view /scopes/:id", async function (assert) {
    assert.expect(6);

    const scope = this.server.create("scope");
    const futureParent = this.server.create("scope");

    await visit(`/scopes/${scope.id}`);

    assert.strictEqual(currentURL(), `/scopes/${scope.id}`);
    // For some reason the await click is not actually waiting for the fetchModels task to finish.
    // Probably some runloop issue.
    await waitUntil(
      () =>
        this.element.querySelector(".ember-power-select-placeholder")
          .innerText !== "Loading..."
    );

    assert.dom('[name="name"]').hasValue(scope.name.en);
    assert.dom('[name="description"]').hasValue(scope.description.en);

    const name = "test";
    const description = "test desc";

    await fillIn('[name="name"]', name);
    await fillIn('[name="description"]', description);

    await selectChoose(".ember-power-select-trigger", futureParent.fullName.en);

    this.assertRequest("PATCH", `/api/v1/scopes/${scope.id}`, (request) => {
      const { attributes, relationships } = JSON.parse(
        request.requestBody
      ).data;

      assert.strictEqual(attributes.name.en, name);
      assert.strictEqual(attributes.description.en, description);
      assert.strictEqual(relationships.parent.data.id, futureParent.id);
    });
    await click("[data-test-save]");
  });

  test("create view /scopes/new", async function (assert) {
    assert.expect(8);

    await visit("/scopes");
    assert.strictEqual(currentURL(), "/scopes");
    assert.dom("[data-test-node-id]").doesNotExist();

    await click("[data-test-new]");
    assert.strictEqual(currentURL(), "/scopes/new");

    await fillIn('[name="name"]', "test");
    await fillIn('[name="description"]', "test");

    this.assertRequest("POST", `/api/v1/scopes`, (request) => {
      const { name, description } = JSON.parse(request.requestBody).data
        .attributes;

      assert.strictEqual(name.en, "test");
      assert.strictEqual(description.en, "test");
    });
    await click("[data-test-save]");

    // For some reason the await click is not actually waiting for the save task to finish.
    // Probably some runloop issue.
    await waitUntil(() => currentURL() !== "/scopes/new");

    const scope = this.server.schema.scopes.first();
    assert.strictEqual(currentURL(), `/scopes/${scope.id}?page=1`);

    assert.dom('[name="name"]').hasValue(scope.name.en);
    assert.dom('[name="description"]').hasValue(scope.description.en);
  });

  test("delete /scopes/:id", async function (assert) {
    assert.expect(5);

    const scope = this.server.create("scope");

    await visit(`/scopes`);
    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();
    assert.dom("[data-test-node-id]").exists({ count: 1 });

    await click("[data-test-node-id]");
    assert.strictEqual(currentURL(), `/scopes/${scope.id}`);
    await waitUntil(
      () =>
        this.element.querySelector(".ember-power-select-placeholder")
          .innerText !== "Loading..."
    );
    this.assertRequest("DELETE", `/api/v1/scopes/:id`, (request) => {
      assert.strictEqual(scope.id, request.params.id);
    });
    await click("[data-test-delete]");
    await waitFor(".uk-modal.uk-open");
    await click(".uk-modal .uk-button-primary");

    // For some reason the await click is not actually waiting for the delete task to finish.
    // Probably some runloop issue.
    await waitUntil(() => currentURL() !== `/scopes/${scope.id}`);

    assert.strictEqual(currentURL(), "/scopes");
    assert.dom("[data-test-node-id]").doesNotExist();
  });

  test("list view /scopes/:id/ shows acl info", async function (assert) {
    assert.expect(5);

    const scope = this.server.create("scope");
    const acl = this.server.createList("acl", 3, { scope })[0];

    this.assertRequest("GET", `/api/v1/acls`, (request) => {
      assert.strictEqual(scope.id, request.queryParams["filter[scope]"]);
    });

    await visit(`/scopes/${scope.id}`);

    assert.dom("[data-test-acl-role]").exists({ count: 3 });

    assert
      .dom("[data-test-acl-name]")
      .hasText(`${acl.user.firstName} ${acl.user.lastName}`);
    assert.dom("[data-test-acl-username]").hasText(acl.user.username);
    assert.dom("[data-test-acl-role]").hasText(acl.role.name.en);
  });
});
