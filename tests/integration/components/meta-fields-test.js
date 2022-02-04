import Service from "@ember/service";
import { fillIn, render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupIntl } from "ember-intl/test-support";
import { selectChoose } from "ember-power-select/test-support";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

const translations = {
  scope: {
    metaExample: "Example for custom choice field",
    option1: "Ham",
    option2: "Cheese",
    metaExample2: "Example for custom text field",
    dynamicVisibility: "field with dynamic visibility (visible)",
    dynamicVisibility2: "field with dynamic visibility (unvisible)",
    dynamicReadOnly: "field with dynamic readOnly state",
  },
};
class EmeisOptionsStub extends Service {
  metaFields = {
    scope: [
      {
        slug: "meta-example",
        label: "scope.metaExample",
        type: "choice",
        options: [
          {
            value: "option-1",
            label: "scope.option1",
          },
          {
            value: "Option 2",
            label: "scope.option2",
          },
        ],
        visible: true,
        readOnly: false,
      },
      {
        slug: "meta-example-2",
        label: "scope.metaExample2",
        type: "text",
        visible: true,
        readOnly: false,
      },
      {
        slug: "dynamic-visibility",
        label: "scope.dynamicVisibility",
        type: "text",
        visible: () => true,
        readOnly: true,
      },
      {
        slug: "dynamic-visibility-2",
        label: "scope.dynamicVisibility2",
        type: "text",
        visible: () => 1 > 2,
        readOnly: false,
      },
      {
        slug: "dynamic-readOnly",
        label: "scope.dynamicReadOnly",
        type: "text",
        visible: (model) => model.name === "readOnly",
        readOnly: (model) => model.name === "readOnly",
      },
    ],
  };
}

module("Integration | Component | meta-fields", function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, ["en"], translations);

  hooks.beforeEach(function () {
    this.owner.register("service:emeisOptions", EmeisOptionsStub);
    this.emeisOptions = this.owner.lookup("service:emeisOptions");

    this.model = {
      metainfo: {},
      notifyPropertyChange: () => {},
    };
  });

  test("it renders", async function (assert) {
    await render(hbs`<MetaFields />`);

    assert.dom(this.element).hasText("");
  });

  test("it renders meta field of type select and text", async function (assert) {
    assert.expect(6);

    await render(hbs`
      <MetaFields
        @model={{this.model}}
        @fields={{this.emeisOptions.metaFields.scope}}
      />
    `);

    assert.dom(".ember-power-select-trigger").exists();
    assert.dom("[data-test-meta-field-text]").exists({ count: 2 });

    assert.dom(this.element).containsText(translations.scope.metaExample);
    assert.dom(this.element).containsText(translations.scope.metaExample2);

    await selectChoose(".ember-power-select-trigger", "Ham");
    assert.deepEqual(this.model.metainfo, {
      "meta-example": "option-1",
    });

    await fillIn("[data-test-meta-field-text]", "My value");
    assert.deepEqual(this.model.metainfo, {
      "meta-example": "option-1",
      "meta-example-2": "My value",
    });
  });

  test("it does not render invisible meta fields", async function (assert) {
    assert.expect(2);

    // Set visibility to `false` for each field
    this.emeisOptions.metaFields.scope.forEach(
      (field) => (field.visible = false)
    );

    await render(hbs`
      <MetaFields
        @model={{this.model}}
        @fields={{this.emeisOptions.metaFields.scope}}
      />
    `);

    assert.dom(".ember-power-select-trigger").doesNotExist();
    assert.dom("[data-test-meta-field-text]").doesNotExist();
  });

  test("it renders fields with dynamically evaluated visibility", async function (assert) {
    assert.expect(2);

    await render(hbs`
      <MetaFields
        @model={{this.model}}
        @fields={{this.emeisOptions.metaFields.scope}}
      />
    `);

    assert.dom("[data-test-meta-field-text='dynamic-visibility']").exists();
    assert
      .dom("[data-test-meta-field-text='dynamic-visibility-2']")
      .doesNotExist();
  });

  test("it renders disabled meta fields", async function (assert) {
    assert.expect(4);

    // Set fields to read-only
    this.emeisOptions.metaFields.scope.forEach(
      (field) => (field.readOnly = true)
    );

    await render(hbs`
      <MetaFields
        @model={{this.model}}
        @fields={{this.emeisOptions.metaFields.scope}}
      />
    `);

    assert.dom(".ember-power-select-trigger").exists();
    assert.dom("[data-test-meta-field-text]").exists({ count: 2 });

    assert.dom(".ember-power-select-trigger").hasAttribute("aria-disabled");
    assert
      .dom("[data-test-meta-field-text='dynamic-visibility']")
      .hasAttribute("disabled");
  });

  test("it renders dynamically disabled meta fields", async function (assert) {
    assert.expect(2);

    this.model.name = "readOnly";

    await render(hbs`
      <MetaFields
        @model={{this.model}}
        @fields={{this.emeisOptions.metaFields.scope}}
      />
    `);

    assert
      .dom("[data-test-meta-field-text='dynamic-readOnly']")
      .exists({ count: 1 });

    assert
      .dom("[data-test-meta-field-text='dynamic-readOnly']")
      .hasAttribute("disabled");
  });
});
