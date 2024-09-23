import { setupTest } from "dummy/tests/helpers";
import { module, test } from "qunit";

module("Unit | Route | create", function (hooks) {
  setupTest(hooks);

  test("getDetailView", function (assert) {
    const route = this.owner.lookup("-private/route:create");
    assert.ok(route);

    route.detailView = "test";
    assert.strictEqual(route.templateName, "test");
    assert.strictEqual(route.controllerName, "test");
  });
});
