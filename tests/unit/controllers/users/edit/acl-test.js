import { setupMirage } from "ember-cli-mirage/test-support";
import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

import setupRequestAssertions from "./../../../../helpers/assert-request";
module("Unit | Controller | users/edit/acl", function (hooks) {
  setupTest(hooks);
  setupMirage(hooks);
  setupRequestAssertions(hooks);

  test("queryParamsfilter", function (assert) {
    const controller = this.owner.lookup("controller:users/edit/acl");
    assert.ok(controller);

    controller.model = { id: 1 };
    assert.deepEqual(controller.queryParamsfilter, { "user": 1 });
  });

  test("createEntry", async function (assert) {
    assert.expect(3);
    const controller = this.owner.lookup("controller:users/edit/acl");
    assert.ok(controller);

    this.assertRequest("POST", "/api/v1/acls", (request) => {
      const relationships = JSON.parse(request.requestBody).data.relationships;
      assert.ok(relationships.role);
      assert.ok(relationships.scope);
    });
    await controller.createEntry.perform({ role: 1, scope: 2 });
  });

  test("createEntry", async function (assert) {
    assert.expect(3);
    const controller = this.owner.lookup("controller:users/edit/acl");
    assert.ok(controller);
    const refresh = () => {
      assert.ok(true);
    };
    const model = {
      destroyRecord() {
        assert.ok(true);
      },
    };

    await controller.deleteEntry.perform(model, refresh);
  });
});
