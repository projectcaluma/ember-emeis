import {
  visit,
  currentURL,
  fillIn,
  click,
  waitUntil,
  settled,
} from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { selectChoose } from "ember-power-select/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

import setupRequestAssertions from "./../helpers/assert-request";

module("Acceptance | permissions", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupRequestAssertions(hooks);

  test("list view /permissions", async function (assert) {
    assert.expect(6);

    const permission = this.server.createList("permission", 10)[0];

    await visit("/permissions");

    assert.strictEqual(currentURL(), "/permissions");
    await settled();

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

  test("detail view /permissions/:id", async function (assert) {
    assert.expect(9);

    const permission = this.server.create("permission");
    const role = this.server.create("role");

    await visit(`/permissions/${permission.id}`);

    assert.strictEqual(currentURL(), `/permissions/${permission.id}`);

    assert.dom('[name="slug"]').hasValue(permission.slug);
    assert.dom('[name="slug"]').hasAttribute("disabled");
    assert.dom('[name="name"]').hasValue(permission.name.en);
    assert.dom('[name="description"]').hasValue(permission.description.en);

    const name = "Permission 1",
      description = "The one and only";

    await fillIn('[name="name"]', name);
    await fillIn('[name="description"]', description);

    await selectChoose(".ember-power-select-trigger", role.name.en);

    this.assertRequest(
      "PATCH",
      `/api/v1/permissions/${permission.id}`,
      (request) => {
        const { attributes, relationships } = JSON.parse(
          request.requestBody
        ).data;

        assert.strictEqual(attributes.name.en, name);
        assert.strictEqual(attributes.description.en, description);
        assert.strictEqual(relationships.roles.data[0].id, role.id);
      }
    );
    await click("[data-test-save]");

    await click("[data-test-back]");
    assert.strictEqual(currentURL(), "/permissions");
  });

  test("create view /permissions/new", async function (assert) {
    assert.expect(11);

    const role = this.server.create("role");

    await visit("/permissions");
    assert.strictEqual(currentURL(), "/permissions");
    assert.dom("[data-test-permission-name]").doesNotExist();

    await click("[data-test-new]");
    assert.strictEqual(currentURL(), "/permissions/new");

    const name = "Permission 1",
      description = "The one and only",
      slug = "permission-1";

    await fillIn('[name="name"]', name);
    await fillIn('[name="description"]', description);
    await fillIn('[name="slug"]', slug);
    await selectChoose(".ember-power-select-trigger", role.name.en);

    this.assertRequest("POST", "/api/v1/permissions", (request) => {
      const { attributes, relationships } = JSON.parse(
        request.requestBody
      ).data;

      assert.strictEqual(attributes.slug, slug);
      assert.strictEqual(attributes.name.en, name);
      assert.strictEqual(attributes.description.en, description);
      assert.strictEqual(relationships.roles.data[0].id, role.id);
    });
    await click("[data-test-save]");

    // For some reason the await click is not actually waiting for the save task to finish.
    // Probably some runloop issue.
    await waitUntil(() => currentURL() !== "/permissions/new");

    const permission = this.server.schema.permissions.first();
    assert.strictEqual(currentURL(), `/permissions/${permission.id}`);

    assert.dom('[name="slug"]').hasAttribute("disabled");
    assert.dom('[name="name"]').hasValue(permission.name.en);
    assert.dom('[name="description"]').hasValue(permission.description.en);
  });

  test("delete /permissions/:id", async function (assert) {
    assert.expect(5);

    const permission = this.server.create("permission", {
      name: "test 1",
      description: "this is test one.",
    });

    await visit(`/permissions`);
    await settled();
    assert.dom("[data-test-permission-name]").exists({ count: 1 });

    await click("[data-test-permission-name] a");
    assert.strictEqual(currentURL(), `/permissions/${permission.id}`);

    this.assertRequest("DELETE", `/api/v1/permissions/:id`, (request) => {
      assert.strictEqual(permission.id, request.params.id);
    });
    await click("[data-test-delete]");

    // For some reason the await click is not actually waiting for the delete task to finish.
    // Probably some runloop issue.
    await waitUntil(() => currentURL() !== `/permissions/${permission.id}`);

    assert.strictEqual(currentURL(), `/permissions?page=1`);
    assert.dom("[data-test-permission-name]").doesNotExist();
  });
});
