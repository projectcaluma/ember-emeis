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

    assert.equal(model.slug, "slug");
    assert.equal(model.name, "name");
    assert.equal(model.description, "desc");
  });
});
