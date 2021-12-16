import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module(
  "Integration | Component | data-table/head/nonsortable",
  function (hooks) {
    setupRenderingTest(hooks);

    hooks.beforeEach(function (assert) {
      this.set("update", () => {
        assert.step("update");
      });
    });

    test("it renders", async function (assert) {
      await render(hbs`
        <DataTable::Head @update={{this.update}} as |head|>
          <head.nonsortable>
            test
          </head.nonsortable>
        </DataTable::Head>
      `);

      assert.dom(this.element).hasText("test");
    });

    test("it renders as block", async function (assert) {
      await render(hbs`
      <DataTable::Head::Sortable @update={{this.update}}>
        template block text
      </DataTable::Head::Sortable>
    `);

      assert.dom(this.element).hasText("template block text");
    });
  }
);
