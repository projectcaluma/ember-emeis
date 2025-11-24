import { render, settled } from "@ember/test-helpers";
import { tracked } from "@glimmer/tracking";
import { setupRenderingTest } from "dummy/tests/helpers";
import { hbs } from "ember-cli-htmlbars";
import { module, test } from "qunit";

module("Integration | Component | nav/item", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    this.route = "ember-emeis.users";

    class CurrentRoute {
      @tracked name = "someotherroute";
    }

    this.router = this.engine.lookup("service:hostRouter");
    this.router.currentRoute = new CurrentRoute();

    await render(
      hbs`<Nav::Item @route={{this.route}}>
  Test
</Nav::Item>`,
      { owner: this.engine },
    );

    assert.dom("li").doesNotHaveClass("uk-active");
    assert.dom("li a").hasText("Test");

    this.router.currentRoute.name = this.route;
    // The property change needs the settled otherwise the change is rendered
    // only after the assert.
    await settled();

    assert.dom("li").hasClass("uk-active");
  });
});
