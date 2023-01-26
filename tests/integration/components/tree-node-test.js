import { render } from "@ember/test-helpers";
import { faker } from "@faker-js/faker";
import { setupRenderingTest } from "dummy/tests/helpers";
import { hbs } from "ember-cli-htmlbars";
import { module, test } from "qunit";

const generateItems = (count) => {
  const items = [];
  let level = 0;
  while (count > 0) {
    const parent = items ? items[items.length - 1] : null;
    const item = {
      name: faker.company.companyName(),
      id: Math.floor(Math.random() * 1000000),
      level,
      children: [],
      parent,
    };
    items.push(item);
    if (parent) parent.children.push(item);
    level++;
    count--;
  }
  return items;
};

module("Integration | Component | tree-node", function (hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    const items = generateItems(3);

    this.set("items", items);
    this.set("item", items[0]);
    this.set("itemRoute", "/scope/edit");
    this.set("activeItem", items[1]);
    this.set("expandedItems", [items[0], items[1]]);
  });

  test("it renders", async function (assert) {
    await render(
      hbs`<TreeNode @item={{this.item}} @itemRoute={{this.itemRoute}} />`
    );

    const item = this.items[0];
    assert.dom(this.element).hasText(`${item.name} (1)`);
  });

  test("it expands when expanedItems are supplied", async function (assert) {
    await render(hbs`<TreeNode
  @item={{this.item}}
  @itemRoute={{this.itemRoute}}
  @activeItem={{this.activeItem}}
  @expandedItems={{this.expandedItems}}
/>`);

    const item = this.items[0];
    assert
      .dom(this.element)
      .hasText(
        `${item.name} (1) ${item.children[0].name} (1) ${item.children[0].children[0].name}`
      );
  });
});
