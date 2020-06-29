import { render, click } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Component | edit-form", function (hooks) {
  setupRenderingTest(hooks);
  hooks.beforeEach(function () {
    const router = class {
      replaceWith() {}
      hasRoute() {}
      transitionTo() {}
      _doTransition() {}
      generateURL() {}
      currentRoute = {
        parent: {
          name: "ember-emeis.parent-route",
        },
      };
    };
    this.router = new router();
    this.owner.register("service:router", this.router, { instantiate: false });
    this.owner.register("service:-routing", this.router, {
      instantiate: false,
    });
    this.owner.register("router:main", this.router, { instantiate: false });
  });

  hooks.afterEach(function () {
    delete this.router;
  });

  test("noDelete", async function (assert) {
    assert.expect(3);

    await render(hbs`<EditForm @noDelete="true"/>`);

    assert.dom("[data-test-back]").exists();
    assert.dom("[data-test-delete]").doesNotExist();
    assert.dom("[data-test-save]").exists();
  });

  test("back", async function (assert) {
    assert.expect(1);
    this.router.transitionTo = (route) => {
      assert.equal(route, "parent-route.index");
    };

    await render(hbs`<EditForm />`);

    await click("[data-test-back]");
  });

  test("delete", async function (assert) {
    assert.expect(3);
    this.router.replaceWith = (route) => {
      assert.equal(route, "ember-emeis.parent-route.index");
    };

    this.set("model", {
      destroyRecord() {
        assert.step("destroyRecord");
      },
    });

    await render(hbs`<EditForm @model={{this.model}}/>`);

    await click("[data-test-delete]");
    assert.verifySteps(["destroyRecord"]);
  });

  test("save", async function (assert) {
    assert.expect(7);
    this.router.replaceWith = (route) => {
      assert.equal(route, "ember-emeis.parent-route.edit");
      assert.step("replaceWith");
    };

    this.setProperties({
      model: {
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

    await render(hbs`
      <EditForm @model={{this.model}} @updateModel={{this.updateModel}}>
        <input name="test">
      </EditForm>
    `);

    await click("[data-test-save]");
    assert.verifySteps(["updateModel", "save", "replaceWith"]);
  });
});
