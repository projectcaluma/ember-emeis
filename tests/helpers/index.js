import Service from "@ember/service";
import {
  setupApplicationTest as upstreamSetupApplicationTest,
  setupRenderingTest as upstreamSetupRenderingTest,
  setupTest as upstreamSetupTest,
} from "ember-qunit";

// This file exists to provide wrappers around ember-qunit's / ember-mocha's
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

  // Additional setup for application tests can be done here.
  //
  // For example, if you need an authenticated session for each
  // application test, you could do:
  //
  // hooks.beforeEach(async function () {
  //   await authenticateSession(); // ember-simple-auth
  // });
  //
  // This is also a good place to call test setup functions coming
  // from other addons:
  //
  // setupIntl(hooks); // ember-intl
  // setupMirage(hooks); // ember-cli-mirage
}

function setupRenderingTest(hooks, options) {
  upstreamSetupRenderingTest(hooks, options);
  hooks.beforeEach(function () {
    this.owner.register("service:hostRouter", MockRouter);
  });
  hooks.afterEach(function () {
    this.owner.unregister("service:hostRouter");
  });
}

function setupTest(hooks, options) {
  upstreamSetupTest(hooks, options);
  hooks.beforeEach(function () {
    this.owner.register("service:hostRouter", MockRouter);
  });
  hooks.afterEach(function () {
    this.owner.unregister("service:hostRouter");
  });
}

export { setupApplicationTest, setupRenderingTest, setupTest };
