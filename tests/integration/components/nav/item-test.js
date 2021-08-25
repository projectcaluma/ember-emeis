import { render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

module("Integration | Component | nav/item", function (hooks) {
  setupRenderingTest(hooks);

  test("it renders", async function (assert) {
    this.set("route", "ember-emeis.users");

    // eslint-disable-next-line ember/no-private-routing-service
    this.set("router", this.owner.lookup("router:main"));
    this.set("router.currentRoute", { name: "someotherroute" });

    await render(hbs`
      <Nav::Item @route={{this.route}}>
        Test
      </Nav::Item>
    `);

    assert.dom("li").doesNotHaveClass("uk-active");
    assert.dom("li a").hasText("Test");

    this.set("router.currentRoute", { name: "ember-emeis.users" });

    assert.dom("li").hasClass("uk-active");
  });
});
