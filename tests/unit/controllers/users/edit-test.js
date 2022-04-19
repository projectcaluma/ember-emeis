import { setupMirage } from "ember-cli-mirage/test-support";
import { setupIntl } from "ember-intl/test-support";
import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

import setupRequestAssertions from "../../../helpers/assert-request";

module("Unit | Controller | users/edit", function (hooks) {
  setupTest(hooks);
  setupIntl(hooks);
  setupMirage(hooks);
  setupRequestAssertions(hooks);

  test("updateModel", function (assert) {
    const controller = this.owner.lookup("controller:users/edit");
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
    const controller = this.owner.lookup("controller:users/edit");
    assert.ok(controller);

    controller.model = { id: 1 };
    assert.deepEqual(controller.queryParamsfilter, { user: 1 });
  });

  test("createEntry", async function (assert) {
    assert.expect(3);
    const controller = this.owner.lookup("controller:users/edit");
    assert.ok(controller);

    this.assertRequest("POST", "/api/v1/acls", (request) => {
      const relationships = JSON.parse(request.requestBody).data.relationships;
      assert.ok(relationships.role);
      assert.ok(relationships.scope);
    });
    await controller.createAclEntry.perform({ role: 1, scope: 2 });
  });

  test("deleteEntry", async function (assert) {
    assert.expect(3);
    const controller = this.owner.lookup("controller:users/edit");
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
