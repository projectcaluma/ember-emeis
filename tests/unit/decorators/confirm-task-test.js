import { click, findAll, waitFor, waitUntil } from "@ember/test-helpers";
import { task } from "ember-concurrency";
import { setupTest } from "ember-qunit";
import { module, test } from "qunit";

import { confirmTask } from "ember-emeis/decorators/confirm-task";

const DUMMY_ARGUMENT = { test: "ok" };

module("Unit | decorators | confirm-task", function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (assert) {
    this.TestStub = class TestStub {
      intl = {
        t: (s) => {
          return s;
        },
      };

      @task
      @confirmTask({ container: "#ember-testing" })
      *deleteSomething(someArgument) {
        assert.step("delete");
        return yield someArgument;
      }
    };
  });

  test("it triggers the action on confirm", async function (assert) {
    assert.expect(3);
    const instance = new this.TestStub();

    const result = instance.deleteSomething.perform(DUMMY_ARGUMENT);

    await waitFor(".uk-modal.uk-open");
    await click(".uk-button-primary");

    assert.deepEqual(result.args[0], DUMMY_ARGUMENT);
    assert.verifySteps(["delete"]);
  });

  test("it does not trigger the action on cancel", async function (assert) {
    assert.expect(1);

    const instance = new this.TestStub();
    instance.deleteSomething.perform();

    await waitFor(".uk-modal-close");
    await click(".uk-modal-close");
    // This fixes flaky test behavior, since UIKit needs a little more time to close the
    // modal and handle it's state. Sadly this can not be awaited via the settled helper
    // nor other ember built-ins.
    await waitUntil(
      function () {
        return findAll(".uk-modal-close").length === 0;
      },
      { timeout: 2000 }
    );

    assert.verifySteps([]);
  });
});
