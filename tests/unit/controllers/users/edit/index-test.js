import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

module("Unit | Controller | users/edit/index", function (hooks) {
  setupTest(hooks);

  test("updateModel", function (assert) {
    const controller = this.owner.lookup("controller:users/edit/index");
    assert.ok(controller);

    const model = {};
    controller.updateModel(model, {
      username: { value: "username" },
      firstName: { value: "firstName" },
      lastName: { value: "lastName" },
      email: { value: "email" },
      phone: { value: "phone" },
      language: { selectedOptions: [{ value: "de" }] },
      address: { value: "address" },
      city: { value: "city" },
      zip: { value: "zip" },
      isActive: { checked: true },
    });

    assert.strictEqual(model.username, "username");
    assert.strictEqual(model.firstName, "firstName");
    assert.strictEqual(model.lastName, "lastName");
    assert.strictEqual(model.email, "email");
    assert.strictEqual(model.phone, "phone");
    assert.strictEqual(model.language, "de");
    assert.strictEqual(model.address, "address");
    assert.strictEqual(model.city, "city");
    assert.strictEqual(model.zip, "zip");
    assert.true(model.isActive);
  });
});
