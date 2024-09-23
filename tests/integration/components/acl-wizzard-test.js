import { render, click, waitUntil } from "@ember/test-helpers";
import { setupRenderingTest } from "dummy/tests/helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupIntl } from "ember-intl/test-support";
import { module, test } from "qunit";

module("Integration | Component | acl-wizzard", function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);
  setupIntl(hooks, ["en"]);

  test("preset user scope role", async function (assert) {
    assert.expect(7);
    this.set("createAclEntry", ({ user, role, scope }) => {
      assert.deepEqual(user, this.user);
      assert.deepEqual(scope, this.scope);
      assert.deepEqual(role, this.role);
    });

    this.setProperties({
      user: 1,
      scope: 1,
      role: 1,
    });

    await render(
      hbs`<AclWizzard
  @user={{this.user}}
  @scope={{this.scope}}
  @role={{this.role}}
  @createAclEntry={{this.createAclEntry}}
/>`
    );

    assert.dom("[data-test-select-user]").doesNotExist();
    assert.dom("[data-test-select-scope]").doesNotExist();
    assert.dom("[data-test-select-role]").doesNotExist();
    assert.dom("[data-test-create-acl]").doesNotHaveAttribute("disabled");

    await click("[data-test-create-acl]");
  });

  test("preset user role", async function (assert) {
    assert.expect(4);
    this.set("createAclEntry", () => {});

    this.setProperties({
      user: 1,
      role: 1,
    });

    await render(
      hbs`<AclWizzard
  @user={{this.user}}
  @scope={{this.scope}}
  @role={{this.role}}
  @createAclEntry={{this.createAclEntry}}
/>`
    );
    assert.dom("[data-test-select-user]").doesNotExist();
    assert.dom("[data-test-select-scope]").exists();
    assert.dom("[data-test-select-role]").doesNotExist();
    assert.dom("[data-test-create-acl]").hasAttribute("disabled");
  });

  test("preset user", async function (assert) {
    assert.expect(4);
    this.set("createAclEntry", () => {});

    this.setProperties({
      user: 1,
    });

    await render(
      hbs`<AclWizzard
  @user={{this.user}}
  @scope={{this.scope}}
  @role={{this.role}}
  @createAclEntry={{this.createAclEntry}}
/>`
    );
    assert.dom("[data-test-select-user]").doesNotExist();
    assert.dom("[data-test-select-scope]").exists();
    assert.dom("[data-test-select-role]").exists();
    assert.dom("[data-test-create-acl]").hasAttribute("disabled");
  });

  test("preset nothing", async function (assert) {
    assert.expect(4);
    this.set("createAclEntry", () => {});

    await render(
      hbs`<AclWizzard
  @user={{this.user}}
  @scope={{this.scope}}
  @role={{this.role}}
  @createAclEntry={{this.createAclEntry}}
/>`
    );
    assert.dom("[data-test-select-user]").exists();
    assert.dom("[data-test-select-scope]").exists();
    assert.dom("[data-test-select-role]").exists();
    assert.dom("[data-test-create-acl]").hasAttribute("disabled");
  });

  test("select model", async function (assert) {
    assert.expect(35);

    const [role, role2] = this.server.createList("role", 2);
    const scope = this.server.createList("scope", 2)[0];
    const user = this.server.createList("user", 2)[0];

    this.set("createAclEntry", (acl) => {
      assert.strictEqual(acl.role.id, role2.id);
      assert.strictEqual(acl.user.id, user.id);
      assert.strictEqual(acl.scope.id, scope.id);
    });

    await render(hbs`<AclWizzard @createAclEntry={{this.createAclEntry}} />`);

    assert.dom("[data-test-select-user]").exists();
    assert.dom("[data-test-select-scope]").exists();
    assert.dom("[data-test-select-role]").exists();
    assert.dom("[data-test-create-acl]").hasAttribute("disabled");

    // Select Role
    await click("button[data-test-select-role]");
    assert.dom("[data-test-create-acl]").doesNotExist();
    assert.dom("table").exists();
    // For some reason the await click is not actually waiting for the fetch task to finish.
    // Probably some runloop issue.
    await waitUntil(() => this.element.querySelector("table tr"));
    assert.dom("[data-test-row]").exists({ count: 2 });

    await click("[data-test-row]");
    assert.dom("button[data-test-select-role]").doesNotExist();
    assert.dom("div[data-test-select-role]").exists();
    assert.dom("table").doesNotExist();

    assert
      .dom("div[data-test-select-role] [data-test-title]")
      .hasText(role.name.en);
    assert
      .dom("div[data-test-select-role] [data-test-body]")
      .hasText(role.description.en);

    assert.dom("[data-test-create-acl]").hasAttribute("disabled");

    // Select Scope
    await click("button[data-test-select-scope]");
    assert.dom("table").exists();
    // For some reason the await click is not actually waiting for the fetch task to finish.
    // Probably some runloop issue.
    await waitUntil(() => this.element.querySelector("table tr"));
    assert.dom("[data-test-row]").exists({ count: 2 });

    await click("[data-test-row]");
    assert.dom("button[data-test-select-scope]").doesNotExist();
    assert.dom("div[data-test-select-scope]").exists();
    assert.dom("table").doesNotExist();

    assert
      .dom("div[data-test-select-scope] [data-test-title]")
      .hasText(scope.name.en);
    assert
      .dom("div[data-test-select-scope] [data-test-body]")
      .hasText(scope.description.en);

    assert.dom("[data-test-create-acl]").hasAttribute("disabled");

    // Select User
    await click("button[data-test-select-user]");
    assert.dom("table").exists();
    // For some reason the await click is not actually waiting for the fetch task to finish.
    // Probably some runloop issue.
    await waitUntil(() => this.element.querySelector("table tr"));
    assert.dom("[data-test-row]").exists({ count: 2 });

    await click("[data-test-row]");
    assert.dom("button[data-test-select-user]").doesNotExist();
    assert.dom("div[data-test-select-user]").exists();
    assert.dom("table").doesNotExist();

    assert
      .dom("div[data-test-select-user] [data-test-title]")
      .hasText(user.username);
    assert
      .dom("div[data-test-select-user] [data-test-body]")
      .hasText(`${user.firstName} ${user.lastName} ${user.email}`);

    assert.dom("[data-test-create-acl]").doesNotHaveAttribute("disabled");

    // Changing role

    await click("[data-test-select-role] [data-test-change]");
    // For some reason the await click is not actually waiting for the fetch task to finish.
    // Probably some runloop issue.
    await waitUntil(() => this.element.querySelector("table tr"));
    assert.dom("[data-test-row]").exists({ count: 2 });

    await click("[data-test-row]:last-child");

    assert
      .dom("div[data-test-select-role] [data-test-title]")
      .hasText(role2.name.en);
    assert
      .dom("div[data-test-select-role] [data-test-body]")
      .hasText(role2.description.en);

    // Create acl entry
    await click("[data-test-create-acl]");
  });
});
