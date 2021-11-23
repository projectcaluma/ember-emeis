import Service from "@ember/service";
import {
  visit,
  currentURL,
  click,
  fillIn,
  waitUntil,
  settled,
} from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

import setupRequestAssertions from "./../helpers/assert-request";

class EmeisOptionsStub extends Service {
  additionalUserFields = {
    phone: "optional",
    language: "required",
  };
}

module("Acceptance | users", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupRequestAssertions(hooks);
  setupIntl(hooks, "en");

  test("list view /users", async function (assert) {
    assert.expect(5);

    const user = this.server.createList("user", 10)[0];

    await visit("/users");
    await settled();

    assert.strictEqual(currentURL(), "/users");

    assert.dom("[data-test-user-username]").exists({ count: 10 });
    assert.dom(`[data-test-user-username="${user.id}"]`).hasText(user.username);
    assert.dom(`[data-test-user-email="${user.id}"]`).hasText(user.email);
    assert
      .dom(`[data-test-user-username="${user.id}"] a`)
      .hasAttribute("href", `/users/${user.id}`);
  });

  test("can hide fields via config", async function (assert) {
    this.owner.register("service:emeis-options", EmeisOptionsStub);

    const user = this.server.create("user", {
      isActive: true,
    });
    this.intl.locale = ["en", "de"];

    await visit(`/users/${user.id}`);
    await settled();

    assert.dom('[name="address"]').doesNotExist();
    assert.dom('[name="city"]').doesNotExist();
    assert.dom('[name="zip"]').doesNotExist();

    assert.dom('[name="phone"]').isNotRequired();
    assert.dom('[name="language"]').isRequired();
  });

  test("detail view /users/:id", async function (assert) {
    assert.expect(27);

    const user = this.server.create("user", {
      isActive: true,
    });
    this.intl.locale = ["en", "de"];

    await visit(`/users/${user.id}`);
    await settled();

    assert.strictEqual(currentURL(), `/users/${user.id}`);

    assert.dom('[name="username"]').hasValue(user.username);
    assert.dom('[name="firstName"]').hasValue(user.firstName);
    assert.dom('[name="lastName"]').hasValue(user.lastName);
    assert.dom('[name="email"]').hasValue(user.email);
    assert.dom('[name="phone"]').hasValue(user.phone);
    assert.dom('[name="language"]').hasValue(user.language);
    assert.dom('[name="address"]').hasValue(user.address);
    assert.dom('[name="city"]').hasValue(user.city.en);
    assert.dom('[name="zip"]').hasValue(user.zip.toString());

    assert.dom('[name="phone"]').isRequired();
    assert.dom('[name="language"]').isRequired();
    assert.dom('[name="address"]').isRequired();
    assert.dom('[name="city"]').isRequired();
    assert.dom('[name="zip"]').isRequired();

    assert.dom('[name="isActive"]').isChecked();

    const username = "newusername",
      firstName = "John",
      lastName = "Doe",
      email = "john.doe@adfinis.com",
      phone = "123 123 12 23",
      language = "de",
      address = "Somestreet 32",
      city = "Sity",
      zip = "2313";

    await fillIn('[name="username"]', username);
    await fillIn('[name="firstName"]', firstName);
    await fillIn('[name="lastName"]', lastName);
    await fillIn('[name="email"]', email);
    await fillIn('[name="phone"]', phone);
    await fillIn('[name="language"]', language);
    await fillIn('[name="address"]', address);
    await fillIn('[name="city"]', city);
    await fillIn('[name="zip"]', zip);

    await click('[name="isActive"]');

    this.assertRequest("PATCH", `/api/v1/users/${user.id}`, (request) => {
      const attributes = JSON.parse(request.requestBody).data.attributes;

      assert.strictEqual(attributes.username, username);
      assert.strictEqual(attributes["first-name"], firstName);
      assert.strictEqual(attributes["last-name"], lastName);
      assert.strictEqual(attributes.email, email);
      assert.strictEqual(attributes.phone, phone);
      assert.strictEqual(attributes.language, language);
      assert.strictEqual(attributes.address, address);
      assert.strictEqual(attributes.city.en, city);
      assert.strictEqual(attributes.zip, zip);
      assert.false(attributes["is-active"]);
    });
    await click("[data-test-save]");

    await click("[data-test-back]");
    assert.strictEqual(currentURL(), "/users");
  });

  test("create view /users/new", async function (assert) {
    assert.expect(28);

    await visit("/users");
    assert.strictEqual(currentURL(), "/users");
    assert.dom("[data-test-user-name]").doesNotExist();

    await click("[data-test-new]");
    assert.strictEqual(currentURL(), "/users/new");

    assert.dom("[data-test-edit-link]").doesNotExist();
    assert.dom("[data-test-acl-link]").doesNotExist();

    const username = "newusername",
      firstName = "John",
      lastName = "Doe",
      email = "john.doe@adfinis.com",
      phone = "123 123 12 23",
      language = "de",
      address = "Somestreet 32",
      city = "Sity",
      zip = "2313";

    await fillIn('[name="username"]', username);
    await fillIn('[name="firstName"]', firstName);
    await fillIn('[name="lastName"]', lastName);
    await fillIn('[name="email"]', email);
    await fillIn('[name="phone"]', phone);
    await fillIn('[name="language"]', language);
    await fillIn('[name="address"]', address);
    await fillIn('[name="city"]', city);
    await fillIn('[name="zip"]', zip);

    await click('[name="isActive"]');

    this.assertRequest("POST", "/api/v1/users", (request) => {
      const { attributes } = JSON.parse(request.requestBody).data;

      assert.strictEqual(attributes.username, username);
      assert.strictEqual(attributes["first-name"], firstName);
      assert.strictEqual(attributes["last-name"], lastName);
      assert.strictEqual(attributes.email, email);
      assert.strictEqual(attributes.phone, phone);
      assert.strictEqual(attributes.language, language);
      assert.strictEqual(attributes.address, address);
      assert.strictEqual(attributes.city.en, city);
      assert.strictEqual(attributes.zip, zip);
      assert.true(attributes["is-active"]);
    });
    await click("[data-test-save]");

    // For some reason the await click is not actually waiting for the save task to finish.
    // Probably some runloop issue.
    await waitUntil(() => currentURL() !== "/users/new");

    const user = this.server.schema.users.first();
    assert.strictEqual(currentURL(), `/users/${user.id}`);

    assert.dom('[name="username"]').hasValue(user.username);
    assert.dom('[name="firstName"]').hasValue(user.firstName);
    assert.dom('[name="lastName"]').hasValue(user.lastName);
    assert.dom('[name="email"]').hasValue(user.email);
    assert.dom('[name="phone"]').hasValue(user.phone);
    assert.dom('[name="language"]').hasValue(user.language);
    assert.dom('[name="address"]').hasValue(user.address);
    assert.dom('[name="city"]').hasValue(user.city.en);
    assert.dom('[name="zip"]').hasValue(user.zip.toString());

    assert.dom('[name="isActive"]').isChecked();

    assert.dom("[data-test-edit-link]").exists();
    assert.dom("[data-test-acl-link]").exists();
  });

  test("list view /users/:id/acl", async function (assert) {
    assert.expect(12);

    const user = this.server.create("user");
    const acl = this.server.createList("acl", 3)[0];

    await visit(`/users`);
    await settled();
    // Each acl also creates a user
    assert.dom("[data-test-user-username]").exists({ count: 4 });

    await click("[data-test-user-username] a");
    assert.strictEqual(currentURL(), `/users/${user.id}`);

    assert.dom("[data-test-edit-link]").exists();
    assert.dom("[data-test-acl-link]").exists();

    this.assertRequest("GET", `/api/v1/acls`, (request) => {
      assert.strictEqual(user.id, request.queryParams["filter[user]"]);
    });
    await click("[data-test-acl-link]");
    assert.strictEqual(currentURL(), `/users/${user.id}/acl`);

    // For some reason the await click is not actually waiting for the fetch task to finish.
    // Probably some runloop issue.
    await waitUntil(() => this.element.querySelector("table thead"));

    assert.dom("[data-test-acl-role]").exists({ count: 3 });
    assert.dom("[data-test-acl-delete]").exists({ count: 3 });

    assert.dom("[data-test-acl-role]").hasText(acl.role.name.en);
    assert.dom("[data-test-acl-scope]").hasText(acl.scope.name.en);

    this.assertRequest("DELETE", `/api/v1/acls/:id`, (request) => {
      assert.strictEqual(request.params.id, acl.id);
    });
    await click("[data-test-acl-delete] button");
    // For some reason the await click is not actually waiting for the delete task to finish.
    // Probably some runloop issue.
    await settled();
    await waitUntil(() => this.element.querySelector("table thead"));
    assert.dom("[data-test-acl-role]").exists({ count: 2 });
  });

  test("create view /users/:id/acl", async function (assert) {
    assert.expect(17);

    const user = this.server.create("user");
    const role = this.server.createList("role", 2)[0];
    const scope = this.server.createList("scope", 2)[0];

    await visit(`/users/${user.id}/acl`);
    await settled();
    assert.strictEqual(currentURL(), `/users/${user.id}/acl`);

    assert.dom("[data-test-acl-role]").doesNotExist();
    assert.dom("[data-test-add-acl]").exists();
    assert.dom("table").exists();

    await click("[data-test-add-acl]");
    assert.dom("table").doesNotExist();
    assert.dom("[data-test-back]").exists();

    // Test back button
    await click("[data-test-back]");
    assert.dom("[data-test-acl-role]").doesNotExist();
    assert.dom("[data-test-back]").doesNotExist();
    // For some reason the await click is not actually waiting for the fetch task to finish.
    // Probably some runloop issue.
    await waitUntil(() => this.element.querySelector("table thead"));
    assert.dom("[data-test-add-acl]").exists();
    assert.dom("table").exists();

    await click("[data-test-add-acl]");

    await click("button[data-test-select-role]");
    // For some reason the await click is not actually waiting for the fetch task to finish.
    // Probably some runloop issue.
    await waitUntil(() => this.element.querySelector("table tr"));
    assert.dom("[data-test-row]").exists({ count: 2 });

    await click("[data-test-row]");

    assert.dom("[data-test-create-acl]").hasAttribute("disabled");

    await click("button[data-test-select-scope]");
    // For some reason the await click is not actually waiting for the fetch task to finish.
    // Probably some runloop issue.
    await waitUntil(() => this.element.querySelector("table tr"));
    assert.dom("[data-test-row]").exists({ count: 2 });

    await click("[data-test-row]");
    assert.dom("[data-test-create-acl]").doesNotHaveAttribute("disabled");

    // Create acl entry
    await click("[data-test-create-acl]");
    // For some reason the await click is not actually waiting for the fetch task to finish.
    // Probably some runloop issue.
    await waitUntil(() => this.element.querySelector("table tr"));
    assert.dom("[data-test-back]").doesNotExist();
    assert.dom("[data-test-acl-scope]").hasText(scope.name.en);
    assert.dom("[data-test-acl-role]").hasText(role.name.en);
  });
});
