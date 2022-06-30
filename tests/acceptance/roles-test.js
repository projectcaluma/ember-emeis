import Service from "@ember/service";
import {
  visit,
  currentURL,
  click,
  fillIn,
  findAll,
  waitFor,
  waitUntil,
  settled,
} from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

import setupRequestAssertions from "./../helpers/assert-request";

const createEmeisOptions = (context) => {
  return class ExtendedEmeisOptionsStub extends Service {
    role = {
      actions: {
        delete: {
          func: () => {
            context.step("delete");
            return true;
          },
          label: () => {
            context.step("delete-label");
            return "my delete label";
          },
        },
      },
      customColumns: [
        {
          heading: "Funktion", // ember-intl or string
          slug: "additional-column-function", // relative to "model.metainfo[slug]"
          sortable: true, // whether sorting is supported for this column
          localized: true, // whether to expect a plain value or a object with localized values
        },
      ],
      metaFields: [
        {
          slug: "meta-example",
          label: "Example for custom text field", // ember-intl translation key
          type: "text",
          visible: true,
          readOnly: false,
          required: false,
          placeholder: "Example for custom text field",
        },
      ],
    };
  };
};

module("Acceptance | roles", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupIntl(hooks, "en");
  setupRequestAssertions(hooks);

  test("list view /roles", async function (assert) {
    assert.expect(6);

    const role = this.server.createList("role", 10)[0];

    await visit("/roles");
    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();

    assert.strictEqual(currentURL(), "/roles");

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

  test("detail view /roles/:id", async function (assert) {
    assert.expect(8);

    const role = this.server.create("role");

    await visit(`/roles/${role.id}`);

    assert.strictEqual(currentURL(), `/roles/${role.id}`);

    assert.dom('[name="slug"]').hasValue(role.slug);
    assert.dom('[name="slug"]').hasAttribute("disabled");
    assert.dom('[name="name"]').hasValue(role.name.en);
    assert.dom('[name="description"]').hasValue(role.description.en);

    const name = "Role 1",
      description = "The one and only";

    await fillIn('[name="name"]', name);
    await fillIn('[name="description"]', description);

    this.assertRequest("PATCH", `/api/v1/roles/${role.id}`, (request) => {
      const attributes = JSON.parse(request.requestBody).data.attributes;

      assert.strictEqual(attributes.name.en, name);
      assert.strictEqual(attributes.description.en, description);
    });
    await click("[data-test-save]");

    await click("[data-test-back]");
    assert.strictEqual(currentURL(), "/roles");
  });

  test("create view /roles/new", async function (assert) {
    assert.expect(10);

    await visit("/roles");
    assert.strictEqual(currentURL(), "/roles");
    assert.dom("[data-test-role-name]").doesNotExist();

    await click("[data-test-new]");
    assert.strictEqual(currentURL(), "/roles/new");

    const name = "Role 1",
      description = "The one and only",
      slug = "role-1";

    await fillIn('[name="name"]', name);
    await fillIn('[name="description"]', description);
    await fillIn('[name="slug"]', slug);

    this.assertRequest("POST", `/api/v1/roles`, (request) => {
      const attributes = JSON.parse(request.requestBody).data.attributes;

      assert.strictEqual(attributes.slug, slug);
      assert.strictEqual(attributes.name.en, name);
      assert.strictEqual(attributes.description.en, description);
    });
    await click("[data-test-save]");

    // For some reason the await click is not actually waiting for the save task to finish.
    // Probably some runloop issue.
    await waitUntil(() => currentURL() !== "/roles/new");

    const role = this.server.schema.roles.first();
    assert.strictEqual(currentURL(), `/roles/${role.id}`);

    assert.dom('[name="slug"]').hasAttribute("disabled");
    assert.dom('[name="name"]').hasValue(role.name.en);
    assert.dom('[name="description"]').hasValue(role.description.en);
  });

  test("delete /roles/:id", async function (assert) {
    assert.expect(5);

    const role = this.server.create("role", {
      name: "test 1",
      description: "this is test one.",
    });

    await visit(`/roles`);
    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();
    assert.dom("[data-test-role-name]").exists({ count: 1 });

    await click("[data-test-role-name] a");
    assert.strictEqual(currentURL(), `/roles/${role.id}`);

    this.assertRequest("DELETE", `/api/v1/roles/:id`, (request) => {
      assert.strictEqual(role.id, request.params.id);
    });
    await click("[data-test-delete]");
    await waitFor(".uk-modal.uk-open");
    await click(".uk-modal .uk-button-primary");

    // For some reason the await click is not actually waiting for the delete task to finish.
    // Probably some runloop issue.
    await waitUntil(() => currentURL() !== `/roles/${role.id}`);

    assert.strictEqual(currentURL(), `/roles?page=1`);
    assert.dom("[data-test-role-name]").doesNotExist();
  });

  test("detail view /roles/:id permission table", async function (assert) {
    assert.expect(4);

    const role = this.server.create("role", {
      permissions: this.server.createList("permission", 10),
    });

    this.assertRequest("GET", `/api/v1/permissions`, (request) => {
      assert.strictEqual(request.queryParams["filter[roles]"], role.id);
    });

    await visit(`/roles/${role.id}`);
    assert.strictEqual(currentURL(), `/roles/${role.id}`);

    await settled();
    assert.dom("[data-test-permissions]").exists();
    await waitUntil(
      () => findAll("[data-test-permissions] [data-test-row]").length > 1
    );
    assert.dom("[data-test-permissions] [data-test-row]").exists({ count: 10 });
  });

  test("emeisOptions integration", async function (assert) {
    assert.expect(11);

    const customEmeisOptionsStub = createEmeisOptions(assert);
    this.owner.register("service:emeis-options", customEmeisOptionsStub);

    const role = this.server.create("role");

    await visit("/roles");
    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();

    assert.strictEqual(currentURL(), "/roles");

    assert
      .dom("[data-test-custom-column=additional-column-function]")
      .exists({ count: 1 });
    assert
      .dom("[data-test-custom-column=additional-column-function]")
      .hasText("Funktion");
    assert
      .dom("[data-test-custom-row=additional-column-function]")
      .exists({ count: 1 });

    await visit(`/roles/${role.id}`);
    assert.dom("[data-test-delete]").hasText("my delete label");
    assert.verifySteps(["delete", "delete-label"]);

    assert.dom("[data-test-meta-field=meta-example]").exists({ count: 1 });
    assert
      .dom("[data-test-meta-field=meta-example]")
      .hasText("Example for custom text field (optional)");
    assert
      .dom("[data-test-meta-field=meta-example] input")
      .hasAttribute("placeholder", "Example for custom text field");
  });
});
