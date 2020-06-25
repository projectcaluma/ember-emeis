import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

module("Unit | Controller | pagination", function (hooks) {
  setupTest(hooks);

  test("updateQueryParam", function (assert) {
    const controller = this.owner.lookup("controller:pagination");
    assert.ok(controller);

    const router = this.owner.lookup("service:router");

    assert.notOk(controller.search);
    assert.equal(controller.page, 1);

    router.transitionTo = ({ queryParams }) => {
      assert.equal(queryParams.search, "test");
    };
    controller.updateQueryParam("search", "test");

    router.transitionTo = ({ queryParams }) => {
      assert.equal(queryParams.page, 10);
    };
    controller.updateQueryParam("page", 10);
  });
});
