import { setupTest } from "dummy/tests/helpers";
import { restartableTask } from "ember-concurrency";
import { module, test } from "qunit";

import {
  handleModelErrors,
  handleTaskErrors,
} from "ember-emeis/-private/decorators";

module("Unit | decorators", function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function (assert) {
    this.TestStub = class TestStub {
      intl = {
        t: () => {
          return "Fehler.";
        },
      };

      notification = {
        danger: () => {
          assert.step("notify-danger");
        },
      };

      @handleModelErrors
      async fetchModel(shouldThrow) {
        if (shouldThrow) {
          throw "nope";
        }
        return "yeah";
      }

      @restartableTask
      @handleTaskErrors
      *fetchModelTask(shouldThrow) {
        if (shouldThrow) {
          throw "nope";
        }
        return yield "yeah";
      }
    };
  });

  module("handle-model-errors", function () {
    test("doesnt catch successes", async function (assert) {
      const instance = new this.TestStub();
      await instance.fetchModel(false);
      assert.verifySteps([]);
    });

    test("catches 404 error", async function (assert) {
      const instance = new this.TestStub();
      await instance.fetchModel(true);
      assert.verifySteps(["notify-danger"]);
    });
  });

  module("handle-task-errors", function () {
    test("doesnt catch successes", async function (assert) {
      const instance = new this.TestStub();
      await instance.fetchModelTask.perform(false);
      assert.verifySteps([]);
    });

    test("catches 404 error", async function (assert) {
      const instance = new this.TestStub();
      await instance.fetchModelTask.perform(true);
      assert.verifySteps(["notify-danger"]);
    });
  });
});
