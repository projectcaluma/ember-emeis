import { render, fillIn } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupIntl } from "ember-intl/test-support";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Component | tree", function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);
  setupIntl(hooks, ["de"]);
  hooks.beforeEach(async function () {
    this.server.createList("scope", 10);
    const store = this.owner.lookup("service:store"),
      scopes = await store.findAll("scope");
    const rootScopes = scopes.filter((scope) => scope.level === 0);

    this.set("items", rootScopes);
    this.set("itemRoute", "/scope/edit");
    this.set("activeItem", rootScopes[0]);
  });

  test("it renders", async function (assert) {
    assert.expect(2);
    await render(hbs`
      <Tree
        @items={{this.items}}
        @itemRoute={{this.itemRoute}}
        @activeItem={{this.activeItem}}
      />`);

    assert.dom("input#search").exists();
    assert.dom("ul.tree li").exists({ count: this.items.length });
  });

  test("filter is working", async function (assert) {
    assert.expect(2);
    await render(hbs`
      <Tree
        @items={{this.items}}
        @itemRoute={{this.itemRoute}}
        @activeItem={{this.activeItem}}
      />`);

    await fillIn("input#search", this.items[0]._name.de);
    assert.dom("ul.tree li").exists({ count: 1 });

    await fillIn("input#search", "X2!+42");
    assert.dom("ul.tree li").doesNotExist();
  });
});
