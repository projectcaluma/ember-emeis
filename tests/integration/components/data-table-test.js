import { render, click, fillIn } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Component | data-table", function (hooks) {
  setupRenderingTest(hooks);

  test("fetch and display correct data", async function (assert) {
    assert.expect(11);

    this.set("modelName", "role");

    const store = this.owner.lookup("service:store");
    store.query = (modelName) => {
      assert.strictEqual(modelName, this.modelName);

      const data = [
        { name: "Role 1", slug: "role-1" },
        { name: "Role 2", slug: "role-2" },
      ];

      data.meta = { pagination: { pages: 5 } };

      return data;
    };

    await render(hbs`
      <DataTable @modelName={{this.modelName}} as |table|>
        <table.head as |role|>
          <td>Heading 1</td>
          <td>Heading 2</td>
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

    assert.dom('form input[name="search"]').exists();
    assert.dom('form button[type="submit"]').exists();

    assert.dom("thead tr").exists({ count: 1 });
    assert.dom("thead tr td:first-child").hasText("Heading 1");
    assert.dom("thead tr td:last-child").hasText("Heading 2");

    assert.dom("tbody tr").exists({ count: 2 });

    assert.dom("tbody tr:first-child td:first-child").hasText("Role 1");
    assert.dom("tbody tr:first-child td:last-child").hasText("role-1");

    assert.dom("tbody tr:last-child td:first-child").hasText("Role 2");
    assert.dom("tbody tr:last-child td:last-child").hasText("role-2");
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
      <DataTable @modelName={{this.modelName}} @page={{this.page}}/>
    `);
    9;
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

  test("search", async function (assert) {
    assert.expect(5);
    const testState = [{ search: undefined }, { search: "test" }];

    const store = this.owner.lookup("service:store");
    store.query = (_, options) => {
      const { search } = testState.shift();
      assert.strictEqual(options.filter.search, search);
      return { meta: { pagination: { pages: 3 } } };
    };

    await render(hbs`
      <DataTable
        @modelName="role"
      />
    `);
    9;

    assert.dom('form input[name="search"]').exists();
    assert.dom('form button[type="submit"]').exists();
    assert.dom('form input[name="search"]').hasValue("");

    await fillIn('form input[name="search"]', "test");
    await click('form button[type="submit"]');
  });

  test("external search", async function (assert) {
    assert.expect(7);
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
        @updateSearch={{set this.search}}
      />
    `);
    9;

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
