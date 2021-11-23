import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

module("Unit | Controller | pagination", function (hooks) {
  setupTest(hooks);

  test("updateQueryParam", function (assert) {
    assert.expect(5);
    const controller = this.owner.lookup("-private/controller:pagination");
    assert.ok(controller);

    const router = this.owner.lookup("service:router");

    assert.notOk(controller.search);
    assert.strictEqual(controller.page, 1);

    router.transitionTo = ({ queryParams }) => {
      assert.strictEqual(queryParams.search, "test");
    };
    controller.updateQueryParam("search", "test");

    router.transitionTo = ({ queryParams }) => {
      assert.strictEqual(queryParams.page, 10);
    };
    controller.updateQueryParam("page", 10);
  });
});
