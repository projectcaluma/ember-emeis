import { setupTest } from "dummy/tests/helpers";
import { module, test } from "qunit";

import setupRequestAssertions from "../../../helpers/assert-request";

module("Unit | Controller | users/edit", function (hooks) {
  setupTest(hooks);
  setupRequestAssertions(hooks);

  test("updateModel", function (assert) {
    const controller = this.engine.lookup("controller:users/edit");
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
  });

  test("queryParamsfilter", function (assert) {
    const controller = this.engine.lookup("controller:users/edit");
    assert.ok(controller);

    controller.model = { id: 1 };
    assert.deepEqual(controller.queryParamsfilter, { user: 1 });
  });

  test("createEntry", async function (assert) {
    assert.expect(3);
    this.server.create("role", { id: 1 });
    this.server.create("scope", { id: 2 });
    const controller = this.engine.lookup("controller:users/edit");
    assert.ok(controller);

    this.assertRequest("POST", "/api/v1/acls", (request) => {
      const relationships = JSON.parse(request.requestBody).data.relationships;
      assert.ok(relationships.role);
      assert.ok(relationships.scope);
    });
    const store = this.engine.lookup("service:store");
    const role = await store.findRecord("role", 1);
    const scope = await store.findRecord("scope", 2);
    await controller.createAclEntry.perform({ role, scope });
  });

  test("deleteEntry", async function (assert) {
    assert.expect(3);
    const controller = this.engine.lookup("controller:users/edit");
    assert.ok(controller);
    const refresh = () => {
      assert.ok(true);
    };
    const model = {
      destroyRecord() {
        assert.ok(true);
      },
    };

    await controller.deleteAclEntry.perform(model, refresh);
  });
});
