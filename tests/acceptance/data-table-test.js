import {
  visit,
  currentURL,
  click,
  fillIn,
  settled,
  waitFor,
} from "@ember/test-helpers";
import { setupMirage } from "ember-cli-mirage/test-support";
import { setupApplicationTest } from "ember-qunit";
import { module, test } from "qunit";

import setupRequestAssertions from "./../helpers/assert-request";

module("Acceptance | data-table", function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);
  setupRequestAssertions(hooks);

  test("search", async function (assert) {
    assert.expect(8);

    this.assertRequest("GET", "/api/v1/permissions", (request) => {
      assert.strictEqual(
        request.queryParams["page[number]"],
        "1",
        "Test if queryParam page[number] is 1"
      );
      assert.strictEqual(request.queryParams["page[size]"], "10"),
        "Test if queryParam page[size] is 10";
      assert.notOk(request.queryParams.search),
        "Test that queryParam search is not set";
    });
    await visit("/permissions");

    assert.strictEqual(
      currentURL(),
      "/permissions",
      "Test currentURL is /permissions"
    );

    this.assertRequest("GET", "/api/v1/permissions", (request) => {
      assert.strictEqual(
        request.queryParams["filter[search]"],
        "test",
        "Test queryParam filter[search] is 'test'"
      );
    });
    await fillIn("[data-test-search-input]", "test");
    await click("[data-test-search-submit]");
    assert.strictEqual(
      currentURL(),
      "/permissions?search=test",
      "Test currentURL is /permissions?search=test"
    );

    await click("[data-test-search-reset]");
    assert.strictEqual(
      currentURL(),
      "/permissions",
      "Test currentURL is reset to /permissions"
    );

    await fillIn("[data-test-search-input]", "");
    await click("[data-test-search-submit]");
    assert.strictEqual(
      currentURL(),
      "/permissions",
      "Test currentURL is /permissions"
    );
  });

  test("pagination", async function (assert) {
    assert.expect(16);

    this.server.createList("permission", 50);

    this.assertRequest("GET", "/api/v1/permissions", (request) => {
      assert.strictEqual(request.queryParams["page[number]"], "1");
      assert.strictEqual(request.queryParams["page[size]"], "10");
      assert.notOk(request.queryParams.search);
    });
    await visit("/permissions");

    assert.strictEqual(currentURL(), "/permissions");
    await settled();
    assert.dom("[data-test-page]").hasText("1 / 5");

    assert.dom("[data-test-next-page]").doesNotHaveClass("uk-disabled");
    assert.dom("[data-test-previous-page]").hasClass("uk-disabled");

    this.assertRequest("GET", "/api/v1/permissions", (request) => {
      assert.strictEqual(request.queryParams["page[number]"], "2");
    });
    await click("[data-test-next-page] button");
    // TODO find out why settled is not working here
    await waitFor("[data-test-page]", { timeout: 2000 });

    assert.strictEqual(currentURL(), "/permissions?page=2");
    assert.dom("[data-test-page]").hasText("2 / 5");

    assert.dom("[data-test-next-page]").doesNotHaveClass("uk-disabled");
    assert.dom("[data-test-previous-page]").doesNotHaveClass("uk-disabled");

    await visit("/permissions?page=5");
    this.assertRequest("GET", "/api/v1/permissions", (request) => {
      assert.strictEqual(request.queryParams["page[number]"], 5);
    });

    assert.strictEqual(currentURL(), "/permissions?page=5");
    await settled();
    assert.dom("[data-test-page]").hasText("5 / 5");

    assert.dom("[data-test-next-page]").hasClass("uk-disabled");

    assert.dom("[data-test-previous-page]").doesNotHaveClass("uk-disabled");
  });
});
