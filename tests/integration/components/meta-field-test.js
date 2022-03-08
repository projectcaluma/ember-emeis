import { fillIn, render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { setupIntl } from "ember-intl/test-support";
import { selectChoose } from "ember-power-select/test-support";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

const translations = {
  metaExample: "Example for custom choice field",
  option1: "Ham",
  option2: "Cheese",
  metaExample2: "Example for custom text field",
  dynamicVisibility: "field with dynamic visibility (visible)",
  dynamicVisibility2: "field with dynamic visibility (unvisible)",
  dynamicReadOnly: "field with dynamic readOnly state",
};

module("Integration | Component | meta-field", function (hooks) {
  setupRenderingTest(hooks);
  setupIntl(hooks, ["en"], translations);

  hooks.beforeEach(function () {
    this.model = {
      metainfo: {},
      notifyPropertyChange: () => {},
    };
  });

  test("it renders meta field of type select", async function (assert) {
    assert.expect(3);

    this.set("field", {
      slug: "meta-example",
      label: "metaExample",
      type: "choice",
      options: [
        {
          value: "option-1",
          label: "option1",
        },
        {
          value: "Option 2",
          label: "option2",
        },
      ],
      visible: true,
      readOnly: false,
    });

    await render(hbs`
      <MetaField
        @model={{this.model}}
        @field={{this.field}}
      />
    `);

    assert.dom(".ember-power-select-trigger").exists();
    assert.dom(this.element).containsText(translations.metaExample);

    await selectChoose(".ember-power-select-trigger", "Ham");
    assert.deepEqual(this.model.metainfo, {
      "meta-example": "option-1",
    });
  });

  test("it renders meta field of type text", async function (assert) {
    assert.expect(3);

    this.set("field", {
      slug: "meta-example-2",
      label: "metaExample2",
      type: "text",
      visible: true,
      readOnly: false,
    });

    await render(hbs`
      <MetaField
        @model={{this.model}}
        @field={{this.field}}
      />
    `);

    assert.dom("[data-test-meta-field-text]").exists({ count: 1 });
    assert.dom(this.element).containsText(translations.metaExample2);

    await fillIn("[data-test-meta-field-text]", "My value");
    assert.deepEqual(this.model.metainfo, {
      "meta-example-2": "My value",
    });
  });

  test("it does not render invisible meta fields", async function (assert) {
    assert.expect(2);

    this.set("field", {
      slug: "invisible",
      label: "invisible",
      type: "text",
      visible: false,
      readOnly: true,
    });

    await render(hbs`
      <MetaField
        @model={{this.model}}
        @field={{this.field}}
      />
    `);

    assert.dom(".ember-power-select-trigger").doesNotExist();
    assert.dom("[data-test-meta-field-text]").doesNotExist();
  });

  test("it renders fields with dynamically evaluated visibility", async function (assert) {
    assert.expect(2);
    this.set("field1", {
      slug: "dynamic-visibility",
      label: "dynamicVisibility",
      type: "text",
      visible: () => true,
      readOnly: true,
    });

    this.set("field2", {
      slug: "dynamic-visibility-2",
      label: "dynamicVisibility2",
      type: "text",
      visible: () => 1 > 2,
      readOnly: false,
    });

    await render(hbs`
      <MetaField
        @model={{this.model}}
        @field={{this.field1}}
      />
      <MetaField
        @model={{this.model}}
        @field={{this.field2}}
      />
    `);

    assert.dom("[data-test-meta-field-text='dynamic-visibility']").exists();
    assert
      .dom("[data-test-meta-field-text='dynamic-visibility-2']")
      .doesNotExist();
  });

  test("it renders statically disabled meta field", async function (assert) {
    assert.expect(1);
    this.set("field", {
      slug: "static-read-only-text",
      label: "staticReadyOnlyText",
      type: "text",
      visible: true,
      readOnly: true,
    });

    await render(hbs`
      <MetaField
        @model={{this.model}}
        @field={{this.field}}
      />
    `);

    assert
      .dom("[data-test-meta-field-text='static-read-only-text']")
      .hasAttribute("disabled");
  });

  test("it renders dynamically disabled meta fields", async function (assert) {
    assert.expect(3);
    this.set("field1", {
      slug: "dynamic-read-only-text",
      label: "dynamicReadOnly",
      type: "text",
      visible: true,
      readOnly: (model) => model.name === "readOnly",
    });

    this.set("field2", {
      slug: "dynamic-read-only-choice",
      label: "dynamicReadOnly",
      type: "choice",
      options: [
        {
          value: "option-1",
          label: "option1",
        },
        {
          value: "Option 2",
          label: "option2",
        },
      ],
      visible: true,
      readOnly: (model) => model.name === "readOnly",
    });

    this.model.name = "readOnly";

    await render(hbs`
      <MetaField
        @model={{this.model}}
        @field={{this.field1}}
      />
      <MetaField
        @model={{this.model}}
        @field={{this.field2}}
      />
    `);

    assert.dom(".ember-power-select-trigger").hasAttribute("aria-disabled");

    assert
      .dom("[data-test-meta-field-text='dynamic-read-only-text']")
      .exists({ count: 1 });

    assert
      .dom("[data-test-meta-field-text='dynamic-read-only-text']")
      .hasAttribute("disabled");
  });
});
