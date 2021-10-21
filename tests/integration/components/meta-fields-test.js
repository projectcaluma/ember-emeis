import Service from "@ember/service";
import { fillIn, render } from "@ember/test-helpers";
import { hbs } from "ember-cli-htmlbars";
import { selectChoose } from "ember-power-select/test-support";
import { setupRenderingTest } from "ember-qunit";
import { module, test } from "qunit";

class IntlStub extends Service {
  primaryLocale = "en";
}

class EmeisOptionsStub extends Service {
  metaFields = {
    scope: [
      {
        slug: "meta-example",
        label: {
          en: "Example for custom choice field",
          de: "Beispiel für benutzerdefiniertes Dropdown-Feld",
        },
        type: "choice",
        options: [
          {
            value: "option-1",
            label: {
              en: "Ham",
              de: "Schinken",
            },
          },
          {
            value: "Option 2",
            label: {
              en: "Cheese",
              de: "Käse",
            },
          },
        ],
        visible: true,
        readOnly: false,
      },
      {
        slug: "meta-example-2",
        label: {
          en: "Example for custom text field",
          de: "Beispiel für benutzerdefiniertes Textfeld",
        },
        type: "text",
        visible: true,
        readOnly: false,
      },
    ],
  };
}

module("Integration | Component | meta-fields", function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register("service:intl", IntlStub);
    this.owner.register("service:emeisOptions", EmeisOptionsStub);

    this.intl = this.owner.lookup("service:intl");
    this.emeisOptions = this.owner.lookup("service:emeisOptions");

    this.model = {
      name: {
        de: "Hase",
        en: "Rabbit",
      },
      description: {
        de: "Ich bin ein Hase",
        en: "I am a rabbit",
      },
      level: 1,
      meta: {},
      notifyPropertyChange: () => {},
    };
  });

  test("it renders", async function (assert) {
    await render(hbs`<MetaFields />`);

    assert.dom(this.element).hasText("");
  });

  test("it renders meta field of type select and text", async function (assert) {
    assert.expect(4);

    await render(hbs`
      <MetaFields
        @model={{this.model}}
        @fields={{this.emeisOptions.metaFields.scope}}
      />
    `);

    assert.dom(".ember-power-select-trigger").exists();
    assert.dom("[data-test-meta-field-text]").exists();

    await selectChoose(".ember-power-select-trigger", "Ham");
    assert.deepEqual(this.model.meta, {
      "meta-example": "option-1",
    });

    await fillIn("[data-test-meta-field-text]", "My value");
    assert.deepEqual(this.model.meta, {
      "meta-example": "option-1",
      "meta-example-2": "My value",
    });
  });

  test("it does not render meta fields", async function (assert) {
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
    assert.dom("[data-test-meta-field-text]").exists();

    assert.dom(".ember-power-select-trigger").hasAttribute("aria-disabled");
    assert.dom("[data-test-meta-field-text]").hasAttribute("disabled");
  });
});
