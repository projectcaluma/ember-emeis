import {
  visit,
  currentURL,
  click,
  fillIn,
  waitUntil,
} from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

import setupRequestAssertions from "./../helpers/assert-request";

module("Acceptance | users", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupRequestAssertions(hooks);
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

  test("detail view /users/:id", async function (assert) {
    assert.expect(22);

    const user = this.server.create("user", {
      isActive: true,
    });
    this.intl.locale = ["en", "de"];

    await visit(`/users/${user.id}`);

    assert.equal(currentURL(), `/users/${user.id}`);

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

      assert.equal(attributes.username, username);
      assert.equal(attributes["first-name"], firstName);
      assert.equal(attributes["last-name"], lastName);
      assert.equal(attributes.email, email);
      assert.equal(attributes.phone, phone);
      assert.equal(attributes.language, language);
      assert.equal(attributes.address, address);
      assert.equal(attributes.city.en, city);
      assert.equal(attributes.zip, zip);
      assert.equal(attributes["is-active"], false);
    });
    await click("[data-test-save]");

    await click("[data-test-back]");
    assert.equal(currentURL(), "/users");
  });
});
