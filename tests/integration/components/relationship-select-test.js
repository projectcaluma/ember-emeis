import { render, waitUntil } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupIntl } from "ember-intl/test-support";
import {
  typeInSearch,
  clickTrigger,
  selectChoose,
} from "ember-power-select/test-support/helpers";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

import setupRequestAssertions from "./../../helpers/assert-request";

module("Integration | Component | relationship-select", function (hooks) {
  setupRenderingTest(hooks);
  setupMirage(hooks);
  setupRequestAssertions(hooks);
  setupIntl(hooks, ["en"]);

  test("single select", async function (assert) {
    this.set("modelName", "role");
    const role = this.server.create("role");

    await render(hbs`
      <RelationshipSelect
        @modelName={{this.modelName}}
        @onChange={{set this.selected}}
        @selected={{this.selected}}
        @placeholder="test"
        as |model|
      >
        <span data-test-name>{{model.name}}</span>
      </RelationshipSelect>
    `);

    this.assertRequest("GET", "/api/v1/roles", (request) => {
      assert.ok(request);
    });
    await clickTrigger();

    // For some reason the await click is not actually waiting for the fetch task to finish.
    // Probably some runloop issue.
    await waitUntil(() => this.element.querySelector("[data-test-name]"));
    assert.dom("[data-test-name]").hasText(role.name.en);

    this.assertRequest("GET", "/api/v1/roles", (request) => {
      assert.equal(request.queryParams["filter[search]"], "test");
    });
    await typeInSearch("test");

    await selectChoose("", role.name.en);
    assert.equal(this.selected.name, role.name.en);
  });

  test("multiple select", async function (assert) {
    this.set("modelName", "role");
    const role = this.server.create("role");

    await render(hbs`
      <RelationshipSelect
        @modelName={{this.modelName}}
        @onChange={{set this.selected}}
        @selected={{this.selected}}
        @placeholder="test"
        @multiple="true"
        as |model|
      >
        <span data-test-name>{{model.name}}</span>
      </RelationshipSelect>
    `);

    this.assertRequest("GET", "/api/v1/roles", (request) => {
      assert.ok(request);
    });
    await clickTrigger();

    // For some reason the await click is not actually waiting for the fetch task to finish.
    // Probably some runloop issue.
    await waitUntil(() => this.element.querySelector("[data-test-name]"));
    assert.dom("[data-test-name]").hasText(role.name.en);

    this.assertRequest("GET", "/api/v1/roles", (request) => {
      assert.equal(request.queryParams["filter[search]"], "test");
    });
    await typeInSearch("test");

    await selectChoose("", role.name.en);
    assert.equal(this.selected[0].name, role.name.en);
  });
});
