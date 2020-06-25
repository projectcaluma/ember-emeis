import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Component | data-table/head", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    await render(hbs`
      <DataTable::Head>
        <td>Test Header</td>
      </DataTable::Head>
    `);

    assert.dom("thead tr").exists();
    assert.dom("tr td").hasText("Test Header");
  });
});
