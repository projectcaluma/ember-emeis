import Service from "@ember/service";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupEngine } from "ember-engines/test-support";
import { setupIntl } from "ember-intl/test-support";
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
} from "ember-qunit";

// This file exists to provide wrappers around ember-qunit's
// test setup functions. This way, you can easily extend the setup that is
// needed per test type.
class MockRouter extends Service {
  currentRoute = {
    name: "ember-emeis.parent-route.edit",
    parent: {
      name: "ember-emeis.parent-route",
    },
  };
}

function setupApplicationTest(hooks, options) {
  upstreamSetupApplicationTest(hooks, options);
  setupIntl(hooks, "en");
  setupMirage(hooks);
}

function setupRenderingTest(hooks, options, addTranslation = undefined) {
  upstreamSetupRenderingTest(hooks, options);
  setupEngine(hooks, "ember-emeis");
  setupIntl(hooks, "en", addTranslation);
  setupMirage(hooks);
  hooks.beforeEach(function () {
    this.engine.register("service:hostRouter", MockRouter);
  });
  hooks.afterEach(function () {
    this.engine.unregister("service:hostRouter");
  });
}

function setupTest(hooks, options) {
  upstreamSetupTest(hooks, options);
  setupEngine(hooks, "ember-emeis");
  setupIntl(hooks, "en");
  setupMirage(hooks);
  hooks.beforeEach(function () {
    this.engine.register("service:hostRouter", MockRouter);
  });
  hooks.afterEach(function () {
    this.engine.unregister("service:hostRouter");
  });
}

export { setupApplicationTest, setupRenderingTest, setupTest };
