import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

module("Unit | Controller | scopes/edit", function (hooks) {
  setupTest(hooks);

  test("updateModel", function (assert) {
    const controller = this.owner.lookup("controller:scopes/edit");
    assert.ok(controller);

    const model = {};
    controller.updateModel(model, {
      name: { value: "name" },
      description: { value: "desc" },
    });

    assert.strictEqual(model.name, "name");
    assert.strictEqual(model.description, "desc");
  });
});
