import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

module("Unit | Route | create", function (hooks) {
  setupTest(hooks);

  test("getDetailView", function (assert) {
    const route = this.owner.lookup("-private/route:create");
    assert.ok(route);

    route.detailView = "test";
    assert.equal(route.templateName, "test");
    assert.equal(route.controllerName, "test");
  });
});
