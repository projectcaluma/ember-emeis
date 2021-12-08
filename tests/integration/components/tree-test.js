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
    const root = this.server.create("scope");
    const level1 = this.server.createList("scope", 3, {
      level: 1,
      parent: root,
    });
    const grandchildren = this.server.createList("scope", 2, {
      level: 2,
      parent: level1[0],
    });

    const store = this.owner.lookup("service:store");
    const scopes = await store.findAll("scope");
    const rootScopes = scopes.filter((scope) => !scope.parent);

    this.set("rootScopes", rootScopes);
    this.set("grandchild", grandchildren[0]);
    this.set("itemRoute", "/scope/edit");
    this.set("activeItem", root);
  });

  test("it renders", async function (assert) {
    assert.expect(2);
    await render(hbs`
      <Tree
        @items={{this.rootScopes}}
        @itemRoute={{this.itemRoute}}
        @activeItem={{this.activeItem}}
      />`);

    assert.dom("[data-test-tree-search]").exists();
    assert.dom("[data-test-node-id]").exists({ count: 4 });
  });

  test("it renders active item", async function (assert) {
    assert.expect(3);
    await render(hbs`
      <Tree
        @items={{this.rootScopes}}
        @itemRoute={{this.itemRoute}}
        @activeItem={{this.grandchild}}
      />`);

    assert.dom("[data-test-tree-search]").exists();
    assert.dom("[data-test-node-id]").exists({ count: 6 });
    assert
      .dom(`[data-test-node-id="${this.grandchild.id}"]`)
      .exists({ count: 1 });
  });

  test("filter is working", async function (assert) {
    assert.expect(2);
    await render(hbs`
      <Tree
        @items={{this.rootScopes}}
        @itemRoute={{this.itemRoute}}
        @activeItem={{this.activeItem}}
      />`);

    const root1 = this.rootScopes[0];
    await fillIn("[data-test-tree-search]", root1._name.de);
    assert.dom(`[data-test-node-id="${root1.id}"]`).exists({ count: 1 });

    await fillIn("[data-test-tree-search]", "X2!+42");
    assert.dom("ul.tree li").doesNotExist();
  });
});
