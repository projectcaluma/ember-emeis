import {
  visit,
  currentURL,
  fillIn,
  click,
  waitUntil,
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

  test("detail view /scopes/:id", async function (assert) {
    assert.expect(7);

    const scope = this.server.create("scope");
    const parent = this.server.create("scope");

    await visit(`/scopes/${scope.id}`);

    assert.equal(currentURL(), `/scopes/${scope.id}`);
    // For some reason the await click is not actually waiting for the fetchModels task to finish.
    // Probably some runloop issue.
    await waitUntil(
      () =>
        this.element.querySelector(".ember-power-select-placeholder")
          .innerText !== "Loading..."
    );

    assert.dom('[name="name"]').hasValue(scope.name.en);
    assert.dom('[name="description"]').hasValue(scope.description.en);

    const name = "test",
      description = "test desc";

    await fillIn('[name="name"]', name);
    await fillIn('[name="description"]', description);

    await selectChoose(".ember-power-select-trigger", parent.name.en);

    this.assertRequest("PATCH", `/api/v1/scopes/${scope.id}`, (request) => {
      const { attributes, relationships } = JSON.parse(
        request.requestBody
      ).data;

      assert.equal(attributes.name.en, name);
      assert.equal(attributes.description.en, description);
      assert.equal(relationships.parent.data.id, parent.id);
    });
    await click("[data-test-save]");

    await click("[data-test-back]");
    assert.equal(currentURL(), "/scopes");
  });

  test("create view /scopes/new", async function (assert) {
    assert.expect(8);

    await visit("/scopes");
    assert.equal(currentURL(), "/scopes");
    assert.dom("[data-test-scope-name]").doesNotExist();

    await click("[data-test-new]");
    assert.equal(currentURL(), "/scopes/new");

    await fillIn('[name="name"]', "test");
    await fillIn('[name="description"]', "test");

    this.assertRequest("POST", `/api/v1/scopes`, (request) => {
      const { name, description } = JSON.parse(
        request.requestBody
      ).data.attributes;

      assert.equal(name.en, "test");
      assert.equal(description.en, "test");
    });
    await click("[data-test-save]");

    // For some reason the await click is not actually waiting for the save task to finish.
    // Probably some runloop issue.
    await waitUntil(() => currentURL() !== "/scopes/new");

    const scope = this.server.schema.scopes.first();
    assert.equal(currentURL(), `/scopes/${scope.id}`);

    assert.dom('[name="name"]').hasValue(scope.name.en);
    assert.dom('[name="description"]').hasValue(scope.description.en);
  });

  test("delete /scopes/:id", async function (assert) {
    assert.expect(5);

    const scope = this.server.create("scope");

    await visit(`/scopes`);
    assert.dom("[data-test-scope-name]").exists({ count: 1 });

    await click("[data-test-scope-name] a");
    assert.equal(currentURL(), `/scopes/${scope.id}`);
    await waitUntil(
      () =>
        this.element.querySelector(".ember-power-select-placeholder")
          .innerText !== "Loading..."
    );
    this.assertRequest("DELETE", `/api/v1/scopes/:id`, (request) => {
      assert.equal(scope.id, request.params.id);
    });
    await click("[data-test-delete]");

    // For some reason the await click is not actually waiting for the delete task to finish.
    // Probably some runloop issue.
    await waitUntil(() => currentURL() !== `/scopes/${scope.id}`);

    assert.equal(currentURL(), `/scopes?page=1`);
    assert.dom("[data-test-scope-name]").doesNotExist();
  });
});
