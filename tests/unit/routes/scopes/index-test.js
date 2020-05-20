import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

module("Unit | Route | scopes/index", function (hooks) {
  setupTest(hooks);

  test("it exists", function (assert) {
    const route = this.owner.lookup("route:scopes/index");
    assert.ok(route);
  });
});
