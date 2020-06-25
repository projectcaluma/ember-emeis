import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Component | data-table/body", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    this.set("models", [{ name: "Test 1" }, { name: "Test 2" }]);

    await render(hbs`
      <DataTable::Body @models={{this.models}} as |body|>
        <body.row>
          <td>{{body.model.name}}</td>
        </body.row>
      </DataTable::Body>
    `);

    assert.dom("tbody tr").exists({ count: 2 });
    assert.dom("tr:first-child td").hasText("Test 1");
    assert.dom("tr:last-child td").hasText("Test 2");

    this.set("models", []);
    assert.dom("tbody [data-test-loading]").exists();
  });
});
