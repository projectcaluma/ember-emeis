import { render, click, fillIn } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupMirage } from "ember-cli-mirage/test-support";
import { timeout } from "ember-concurrency";
import { setupIntl } from "ember-intl/test-support";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Component | data-table", function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);
  setupIntl(hooks, "en");

  test("fetch and display correct data", async function (assert) {
    assert.expect(7);

    this.set("modelName", "role");
    const role = this.server.createList("role", 10)[0];

    await render(hbs`
      <DataTable @modelName={{this.modelName}} as |table|>
        <table.head as |Column|>
          <Column>Heading 1</Column>
          <Column>Heading 2</Column>
        </table.head>
        <table.body as |body|>
          <body.row>
            {{#let body.model as |role|}}
              <td data-test-role-slug="{{role.slug}}">{{role.name}}</td>
              <td>{{role.slug}}</td>
            {{/let}}
          </body.row>
        </table.body>
      </DataTable>
    `);

    assert.dom('form input[name="search"]').exists();
    assert.dom('form button[type="submit"]').exists();

    assert.dom("thead tr").exists({ count: 1 });
    assert.dom("thead tr th:first-child").hasText("Heading 1");
    assert.dom("thead tr th:last-child").hasText("Heading 2");

    await timeout(100);

    assert.dom("tbody tr").exists({ count: 10 });
    assert
      .dom(`tbody tr td[data-test-role-slug=${role.slug}]`)
      .hasText(role.name.en);
  });

  test("pagination", async function (assert) {
    assert.expect(15);

    this.set("modelName", "role");
    this.set("page", 1);

    const store = this.owner.lookup("service:store");
    store.query = (_, options) => {
      assert.strictEqual(options.page.number, this.page);
      assert.strictEqual(options.page.size, 10);
      return { meta: { pagination: { pages: 3 } } };
    };

    await render(hbs`
      <DataTable
        @modelName={{this.modelName}}
        @page={{this.page}}
        as |table|>
          <table.head as |Column|>
            <Column @sort="one">
              Heading One
            </Column>
            <Column>
              Heading One
            </Column>
          </table.head>
          <table.body as |body|>
            <body.row>
              {{#let body.model as |role|}}
                <td>{{role.name}}</td>
                <td>{{role.slug}}</td>
              {{/let}}
            </body.row>
          </table.body>
      </DataTable>
    `);

    assert.dom("tfoot tr").exists();

    assert.dom("tfoot span[uk-pagination-previous]").exists();
    assert.dom("tfoot span[uk-pagination-next]").exists();

    assert.dom("tfoot li:first-child").hasClass("uk-disabled");
    assert.dom("tfoot li:last-child").doesNotHaveClass("uk-disabled");

    this.set("page", 2);
    await click("[data-test-next-page] button");

    assert.dom("tfoot li:first-child").doesNotHaveClass("uk-disabled");
    assert.dom("tfoot li:last-child").doesNotHaveClass("uk-disabled");

    this.set("page", 3);
    await click("[data-test-next-page] button");

    assert.dom("tfoot li:first-child").doesNotHaveClass("uk-disabled");
    assert.dom("tfoot li:last-child").hasClass("uk-disabled");
  });

  test("datatable fetches includes", async function (assert) {
    assert.expect(6);

    this.set("modelName", "user");

    const store = this.owner.lookup("service:store");
    store.query = (_, options) => {
      assert.strictEqual(options.include, "acls.role,acls.scope");

      const data = [
        {
          name: "User 1",
          acls: {
            role: {
              id: "role-1",
              name: "Role 1",
            },
            scope: {
              name: "scope1",
            },
          },
        },
        {
          name: "User 2",
          acls: {
            role: {
              id: "role-2",
              name: "Role 2",
            },
            scope: {
              name: "scope2",
            },
          },
        },
      ];

      data.meta = { pagination: { pages: 1 } };
      return data;
    };

    await render(hbs`
      <DataTable
        @modelName={{this.modelName}}
        @include={{array "acls.role" "acls.scope"}}
        as |table|>
          <table.head as |Column|>
            <Column @sort="one">
              Heading One
            </Column>
            <Column>
              Roles
            </Column>
            <Column>
              Scopes
            </Column>
          </table.head>
          <table.body as |body|>
            <body.row>
              {{#let body.model as |user|}}
                <td>{{user.name}}</td>
                <td>{{user.acls.role.name}}</td>
                <td>{{user.acls.scope.name}}</td>
              {{/let}}
            </body.row>
          </table.body>
      </DataTable>
    `);

    assert.dom("thead tr th:first-child").hasText("Heading One");
    assert.dom("thead tr th:last-child").hasText("Scopes");

    assert.dom("tbody tr td:first-child").hasText("User 1");
    assert.dom("tbody tr:last-child td:nth-child(2)").hasText("Role 2");
    assert.dom("tbody tr:last-child td:nth-child(3)").hasText("scope2");
  });

  test("search", async function (assert) {
    assert.expect(5);
    const search = "test";

    const store = this.owner.lookup("service:store");
    const expectedSearch = [undefined, search];
    store.query = (_, options) => {
      assert.strictEqual(options.filter.search, expectedSearch.shift());
      return { meta: { pagination: { pages: 3 } } };
    };

    await render(hbs`
      <DataTable
        @modelName="role"
        as |table|>
          <table.body as |body|>
            <body.row>
              {{#let body.model as |role|}}
                <td>{{role.name}}</td>
                <td>{{role.slug}}</td>
              {{/let}}
            </body.row>
          </table.body>
      </DataTable>
    `);

    assert.dom('form input[name="search"]').exists();
    assert.dom('form button[type="submit"]').exists();
    assert.dom('form input[name="search"]').hasValue("");

    await fillIn('form input[name="search"]', search);
    await click('form button[type="submit"]');
  });

  test("external search", async function (assert) {
    assert.expect(8);
    this.setProperties({
      search: undefined,
    });

    const store = this.owner.lookup("service:store");
    store.query = (_, options) => {
      assert.strictEqual(options.filter.search, this.search);
      return { meta: { pagination: { pages: 3 } } };
    };

    await render(hbs`
      <DataTable
        @modelName="role"
        @search={{this.search}}
        @updateSearch={{set this "search"}}
        as |table|>
          <table.body as |body|>
            <body.row>
              {{#let body.model as |role|}}
                <td>{{role.name}}</td>
                <td>{{role.slug}}</td>
              {{/let}}
            </body.row>
          </table.body>
      </DataTable>
    `);

    assert.dom('form input[name="search"]').exists();
    assert.dom('form button[type="submit"]').exists();
    assert.dom('form input[name="search"]').hasValue("");

    this.set("search", "test");

    assert.dom('form input[name="search"]').hasValue("test");

    await fillIn('form input[name="search"]', "test2");
    await click('form button[type="submit"]');
    assert.strictEqual(this.search, "test2");
  });
});
