import Service from "@ember/service";
import { render, click, waitFor } from "@ember/test-helpers";
import { setupRenderingTest } from "dummy/tests/helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupIntl } from "ember-intl/test-support";
import { module, test } from "qunit";

import DummyButton from "../../../components/dummy-button/dummy-button";

class EmeisOptionsStub extends Service {
  user = {
    customComponent: DummyButton,
  };
}

module("Integration | Component | edit-form", function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks);

  hooks.beforeEach(function () {
    this.router = this.owner.lookup("service:hostRouter");
    this.owner.register("service:emeis-options", EmeisOptionsStub);
  });

  hooks.afterEach(function () {
    delete this.router;
  });

  test("disableDelete", async function (assert) {
    assert.expect(3);

    await render(hbs`<EditForm @disableDelete="true" />`);

    assert.dom("[data-test-toggle-active]").doesNotExist();
    assert.dom("[data-test-delete]").doesNotExist();
    assert.dom("[data-test-save]").exists();
  });

  test("toggle active state", async function (assert) {
    assert.expect(2);

    this.setProperties({
      model: {
        _internalModel: {
          modelName: "user",
        },
        save() {
          assert.step("save");
        },
        isNew: false,
        isActive: true,
      },
    });

    await render(hbs`<EditForm @model={{this.model}} @updateModel={{this.updateModel}}>
  <input name="test" />
</EditForm>`);

    await click("[data-test-toggle-active]");
    assert.verifySteps(["save"]);
  });

  test("delete", async function (assert) {
    assert.expect(3);

    this.router.currentRoute.name = "ember-emeis.parent-route.edit.index";
    this.router.replaceWith = (route) => {
      assert.strictEqual(route, "ember-emeis.parent-route.index");
    };

    this.set("model", {
      _internalModel: {
        modelName: "user",
      },
      destroyRecord() {
        assert.step("destroyRecord");
      },
    });

    await render(hbs`<EditForm @model={{this.model}} />`);

    await click("[data-test-delete]");
    await waitFor(".uk-modal.uk-open");
    await click(".uk-modal .uk-button-primary");

    assert.verifySteps(["destroyRecord"]);
  });

  test("save", async function (assert) {
    assert.expect(7);
    this.router.replaceWith = (route) => {
      assert.strictEqual(route, "ember-emeis.parent-route.edit");
      assert.step("replaceWith");
    };

    this.setProperties({
      model: {
        _internalModel: {
          modelName: "user",
        },
        save() {
          assert.step("save");
        },
        isNew: true,
      },
      updateModel(model, elements) {
        assert.ok(elements.test, "Test that test input is passed");
        assert.ok(model, "Test if model is truthy");
        assert.step("updateModel");
        return model;
      },
    });

    await render(hbs`<EditForm @model={{this.model}} @updateModel={{this.updateModel}}>
  <input name="test" />
</EditForm>`);

    await click("[data-test-save]");
    assert.verifySteps(["updateModel", "save", "replaceWith"]);
  });

  test("custom action", async function (assert) {
    assert.expect(4);
    this.router.currentRoute.parent.name = "ember-emeis.users.edit";

    await render(hbs`<EditForm />`);

    assert.dom("[data-test-custom-component]").exists();
    assert.dom("[data-test-custom-component].uk-button-danger").exists();
    assert
      .dom("[data-test-custom-component]")
      .hasNoAttribute("data-test-action-triggered");

    await click("[data-test-custom-component]");

    assert
      .dom("[data-test-custom-component]")
      .hasAttribute("data-test-action-triggered");
  });
});
