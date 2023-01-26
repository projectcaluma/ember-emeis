import { setupTest } from "dummy/tests/helpers";
import { module, test } from "qunit";

module("Unit | Service | emeis-options", function (hooks) {
  setupTest(hooks);

  // emeisOptions are tested implicitely by the model's index and edit views
  test("it exists", function (assert) {
    const service = this.owner.lookup("service:emeis-options");
    assert.ok(service);
  });
});
