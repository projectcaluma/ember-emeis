import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

module("Unit | Controller | roles/edit", function (hooks) {
  setupTest(hooks);

  test("updateModel", function (assert) {
    const controller = this.owner.lookup("controller:roles/edit");
    assert.ok(controller);

    const model = {};
    controller.updateModel(model, {
      slug: { value: "slug" },
      name: { value: "name" },
      description: { value: "desc" },
    });

    assert.strictEqual(model.slug, "slug");
    assert.strictEqual(model.name, "name");
    assert.strictEqual(model.description, "desc");
  });
});
