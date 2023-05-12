import Service from "@ember/service";
import {
  visit,
  currentURL,
  click,
  fillIn,
  waitUntil,
  settled,
  waitFor,
} from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupIntl } from "ember-intl/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

import setupRequestAssertions from "./../helpers/assert-request";

class EmeisOptionsStub extends Service {
  user = {
    additionalFields: {
      phone: "optional",
      language: "required",
    },
  };
}

const createEmeisOptions = (context) => {
  return class ExtendedEmeisOptionsStub extends Service {
    user = {
      actions: {
        delete: () => {
          context.step("delete");
          return true;
        },
        deactivate: {
          func: () => {
            context.step("deactivate");
            return true;
          },
          label: (model) => {
            context.step(
              model.isActive ? "deactivate-label" : "reactivate-label"
            );
            return model.isActive
              ? "my deactivate label"
              : "my reactivate label";
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
          label: "emeis.options.meta.user.example", // ember-intl translation key
          type: "text",
          visible: true,
          readOnly: false,
          required: false,
          placeholder: "emeis.options.meta.user.example",
        },
      ],
    };
  };
};

module("Acceptance | users", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupRequestAssertions(hooks);
  setupIntl(hooks, "en");

  test("list view /users", async function (assert) {
    assert.expect(6);

    const users = this.server.createList("user", 10);
    const user = this.server.create("user", { isActive: true });

    await visit("/users");
    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();

    assert.strictEqual(currentURL(), "/users");

    assert
      .dom("[data-test-user-username]")
      .exists({ count: users.filter((user) => user.isActive).length + 1 });
    assert.dom(`[data-test-user-username="${user.id}"]`).hasText(user.username);
    assert.dom(`[data-test-user-email="${user.id}"]`).hasText(user.email);
    assert
      .dom(`[data-test-user-username="${user.id}"] a`)
      .hasAttribute("href", `/users/${user.id}`);

    await click(
      "[data-test-filters-radio-buttons='active'] [data-test-filters-radio-buttons-button='off']"
    );

    await waitFor("[data-test-user-username]");

    assert.dom("[data-test-user-username]").exists({
      count: users.filter((user) => user.isActive === false).length,
    });
  });

  test("can hide fields via config", async function (assert) {
    this.owner.register("service:emeis-options", EmeisOptionsStub);

    const user = this.server.create("user", {
      isActive: true,
    });
    this.intl.locale = ["en", "de"];

    await visit(`/users/${user.id}`);
    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();

    assert.dom('[name="address"]').doesNotExist();
    assert.dom('[name="city"]').doesNotExist();
    assert.dom('[name="zip"]').doesNotExist();

    assert.dom('[name="phone"]').isNotRequired();
    assert.dom('[name="language"]').isRequired();
  });

  test("detail view /users/:id", async function (assert) {
    assert.expect(25);

    const user = this.server.create("user", {
      isActive: true,
    });
    this.intl.locale = ["en", "de"];

    await visit(`/users/${user.id}`);
    // eslint-disable-next-line ember/no-settled-after-test-helper
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

    const username = "newusername";
    const firstName = "John";
    const lastName = "Doe";
    const email = "john.doe@adfinis.com";
    const phone = "123 123 12 23";
    const language = "de";
    const address = "Somestreet 32";
    const city = "Sity";
    const zip = "2313";

    await fillIn('[name="username"]', username);
    await fillIn('[name="firstName"]', firstName);
    await fillIn('[name="lastName"]', lastName);
    await fillIn('[name="email"]', email);
    await fillIn('[name="phone"]', phone);
    await fillIn('[name="language"]', language);
    await fillIn('[name="address"]', address);
    await fillIn('[name="city"]', city);
    await fillIn('[name="zip"]', zip);

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
    });
    await click("[data-test-save]");

    await click("[data-test-back]");

    assert.strictEqual(currentURL(), `/users`);
  });

  test("create view /users/new", async function (assert) {
    assert.expect(24);

    await visit("/users");
    assert.strictEqual(currentURL(), "/users");
    assert.dom("[data-test-user-name]").doesNotExist();

    await click("[data-test-new]");
    assert.strictEqual(currentURL(), "/users/new");

    const username = "newusername";
    const firstName = "John";
    const lastName = "Doe";
    const email = "john.doe@adfinis.com";
    const phone = "123 123 12 23";
    const language = "de";
    const address = "Somestreet 32";
    const city = "Sity";
    const zip = "2313";

    await fillIn('[name="username"]', username);
    await fillIn('[name="firstName"]', firstName);
    await fillIn('[name="lastName"]', lastName);
    await fillIn('[name="email"]', email);
    await fillIn('[name="phone"]', phone);
    await fillIn('[name="language"]', language);
    await fillIn('[name="address"]', address);
    await fillIn('[name="city"]', city);
    await fillIn('[name="zip"]', zip);

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
    assert.strictEqual(currentURL(), `/users/${user.id}?page=1`);

    assert.dom('[name="username"]').hasValue(user.username);
    assert.dom('[name="firstName"]').hasValue(user.firstName);
    assert.dom('[name="lastName"]').hasValue(user.lastName);
    assert.dom('[name="email"]').hasValue(user.email);
    assert.dom('[name="phone"]').hasValue(user.phone);
    assert.dom('[name="language"]').hasValue(user.language);
    assert.dom('[name="address"]').hasValue(user.address);
    assert.dom('[name="city"]').hasValue(user.city.en);
    assert.dom('[name="zip"]').hasValue(user.zip.toString());

    assert.dom("[data-test-back]").exists();
  });

  test("list view /users/:id/acl", async function (assert) {
    assert.expect(9);

    const user = this.server.create("user", { isActive: true });
    const acls = this.server.createList("acl", 3);
    const acl = acls[0];

    const userCount = [user]
      .concat(acls.map((acl) => acl.user))
      .filter((u) => u.isActive).length;

    await visit(`/users`);
    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();
    // Each acl also creates a user
    assert.dom("[data-test-user-username]").exists({ count: userCount });

    await click("[data-test-user-username] a");
    assert.strictEqual(currentURL(), `/users/${user.id}`);

    this.assertRequest("GET", `/api/v1/acls`, (request) => {
      assert.strictEqual(user.id, request.queryParams["filter[user]"]);
    });

    // For some reason the await click is not actually waiting for the fetch task to finish.
    // Probably some runloop issue.
    await waitUntil(() => this.element.querySelector("table thead"));

    assert.dom("[data-test-acl-role]").exists({ count: 3 });
    assert.dom("[data-test-acl-delete]").exists({ count: 3 });

    assert.dom("[data-test-acl-role]").hasText(acl.role.name.en);
    assert.dom("[data-test-acl-scope]").hasText(acl.scope.fullName.en);

    this.assertRequest("DELETE", `/api/v1/acls/:id`, (request) => {
      assert.strictEqual(request.params.id, acl.id);
    });
    await click("[data-test-acl-delete] button");
    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();
    await waitUntil(() =>
      this.element.querySelector("table tbody:not([data-test-loading])")
    );
    assert.dom("[data-test-acl-role]").exists({ count: 2 });
  });

  test("create view /users/:id for acl", async function (assert) {
    assert.expect(17);

    const user = this.server.create("user");
    const role = this.server.createList("role", 2)[0];
    const scope = this.server.createList("scope", 2)[0];

    await visit(`/users/${user.id}`);
    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();
    assert.strictEqual(currentURL(), `/users/${user.id}`);

    assert.dom("[data-test-acl-role]").doesNotExist();
    assert.dom("[data-test-add-acl]").exists();
    assert.dom("table").exists();

    await click("[data-test-add-acl]");
    assert.dom("table").doesNotExist();
    assert.dom("[data-test-acl-back]").exists();

    // Test back button
    await click("[data-test-acl-back]");
    assert.dom("[data-test-acl-role]").doesNotExist();
    assert.dom("[data-test-acl-back]").doesNotExist();
    assert.dom("[data-test-add-acl]").exists();
    assert.dom("table").exists();

    await click("[data-test-add-acl]");

    await waitFor("button[data-test-select-role]");
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
    await waitUntil(() =>
      this.element.querySelector("table tbody:not([data-test-loading])")
    );
    assert.dom("[data-test-acl-back]").doesNotExist();
    assert.dom("[data-test-acl-scope]").hasText(scope.fullName.en);
    assert.dom("[data-test-acl-role]").hasText(role.name.en);
  });

  test("emeisOptions integration", async function (assert) {
    assert.expect(17);

    const customEmeisOptionsStub = createEmeisOptions(assert);
    this.owner.register("service:emeis-options", customEmeisOptionsStub);

    const user = this.server.create("user", { isActive: true });

    await visit("/users");
    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();

    assert.strictEqual(currentURL(), "/users");

    assert
      .dom("[data-test-custom-column=additional-column-function]")
      .exists({ count: 1 });
    assert
      .dom("[data-test-custom-column=additional-column-function]")
      .hasText("Funktion");
    assert
      .dom("[data-test-custom-row=additional-column-function]")
      .exists({ count: 1 });

    await visit(`/users/${user.id}`);
    assert.dom("[data-test-toggle-active]").hasText("my deactivate label");
    assert.verifySteps(["delete", "deactivate", "deactivate-label", "delete"]);

    await click("[data-test-toggle-active]");
    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();
    // have a look at 'edit-form.hbs' for further insights
    assert.verifySteps(["reactivate-label"]);

    await click("[data-test-toggle-active]");
    // eslint-disable-next-line ember/no-settled-after-test-helper
    await settled();
    assert.verifySteps(["deactivate-label"]);

    assert.dom("[data-test-meta-field=meta-example]").exists({ count: 1 });
    assert
      .dom("[data-test-meta-field=meta-example]")
      .hasText("Example for custom text field (optional)");
    assert
      .dom("[data-test-meta-field=meta-example] input")
      .hasAttribute("placeholder", "Example for custom text field");
  });
});
