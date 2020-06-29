import { render, click } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, skip } from "qunit";

module("Integration | Component | acl-wizzard/select-card", function (hooks) {
  setupRenderingTest(hooks);

  skip("no selected", async function (assert) {
    assert.expect(2);
    this.set("selectEntry", () => {
      assert.step("selectEntry");
    });

    await render(hbs`
      <AclWizzard::SelectCard
        selected={{this.selected}}
        header={{this.header}}
        selectEntry={{this.selectEntry}}
      />
    `);

    assert.dom("[data-test-change]").exists();
    await click("[data-test-change]");
  });

  skip("selected", async function (assert) {
    assert.expect(3);

    this.setProperties({
      selected: { name: "test", description: "desc" },
      selectEntry() {
        assert.step("selectEntry");
      },
    });

    await render(hbs`
      <AclWizzard::SelectCard
        selected={{this.selected}}
        header={{this.header}}
        selectEntry={{this.selectEntry}}
      />
    `);

    assert.dom("[data-test-title]").hasText("test");
    assert.dom("[data-test-body]").hasText("desc");
    await click("[data-test-change]");

    this.set("header", "test header");
    assert.dom("[data-test-title]").hasText("test header");
  });

  skip("block", async function (assert) {
    assert.expect(2);

    this.setProperties({
      selected: { name: "test", description: "desc" },
      selectEntry() {},
    });

    await render(hbs`
      <AclWizzard::SelectCard
        selected={{this.selected}}
        header={{this.header}}
        selectEntry={{this.selectEntry}}
      >
        test desc
      </AclWizzard::SelectCard>
    `);

    assert.dom("[data-test-title]").hasText("test");
    assert.dom("[data-test-body]").hasText("test desc");
  });
});
