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

    assert.equal(model.username, "username");
    assert.equal(model.firstName, "firstName");
    assert.equal(model.lastName, "lastName");
    assert.equal(model.email, "email");
    assert.equal(model.phone, "phone");
    assert.equal(model.language, "de");
    assert.equal(model.address, "address");
    assert.equal(model.city, "city");
    assert.equal(model.zip, "zip");
    assert.true(model.isActive);
  });
});
