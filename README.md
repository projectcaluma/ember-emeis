# ember-emeis

![Test](https://github.com/projectcaluma/ember-emeis/workflows/Test/badge.svg)
[![Dependabot](https://badgen.net/github/dependabot/projectcaluma/ember-emeis/?icon=dependabot)](https://dependabot.com/)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: LGPL-3.0](https://img.shields.io/badge/License-LGPL--3.0-blue.svg)](https://spdx.org/licenses/LGPL-3.0-or-later.html)

The frontend for the [emeis](https://github.com/projectcaluma/emeis) user management service

## Compatibility

- Ember.js v4.4 or above
- Ember CLI v4.4 or above
- Node.js v16 or above

## Installation

```bash
ember install ember-emeis
```

Then add the following lines to your `app/styles/app.scss`:

```scss
@import "ember-uikit";
@import "ember-emeis";
```

Register the engine in `app/app.js`:

```js
export default class App extends Application {
  // ...

  this.engines = {
    "ember-emeis": {
      dependencies: {
        services: ["store", "fetch", "intl", "notification", { "host-router": "router"
}],
      },
    },
  };
}
});
```

Emeis requires the following services to be injects:

- `store` - almost all of the data fetching is done using ember data
- `fetch` - the user export requires a `fetch` services that handles authentication
- `intl` - ember-intl for i18n
- `notification` - handles success and error messages
- `host-router` - the ember router service

## Configuration

### Emeis options

Basic configuration of ember-emeis can be done via the `emeis-options` service. To generate it, run `ember g service emeis-options` and add it to the dependencies in `app/app.js`:

```js
export default class App extends Application {
  // ...

  this.engines = {
    "ember-emeis": {
      dependencies: {
        services: ["store", "intl", "notification", "router", "emeis-options"],
      },
    },
  };
}
});
```

The config service supports the following options:

```js
import Service from "@ember/service";

import DummyButton from "dummy/app/components/dummy-button/dummy-button";

export default class EmeisOptionsService extends Service {
  // number of items in list views
  pageSize = 10;

  // force the locale of models to a specific value (i.e. to make it "untranslated")
  forceLocale = {
    scope: "en",
  };

  // hide "username" field
  emailAsUsername = false;

  // show only a subset of the main navigation entries
  navigationEntries = ["users", "scopes"];

  // user view specific settings
  user = {
    /*
    Within the actions block you can define functions which evaluate the visibility of the "deactivate" and "delete" buttons in the model edit form. The visibilty must be defined for each model separately. The model must support the "isActive" property for deactivation capabilities, which are currently only supported by user and scope.
    */
    actions: {
      deactivate: (model) => myUser.canChange(model),
      delete: {
        label: "some.translation.key", // you can optionally override the label for the action button with translation key or static string
        func: (model) => myUser.canDelete(model), // in case of label overrides, you have to define th function override via the "func" key
      },
    },
    // show only a subset of the "additional" fields on the user model
    additionalFields: {
      phone: "required",
      language: "required",
      address: "optional",
      city: "optional",
      zip: "optional",
    },
    // adds additional custom columns to this model's list view. *Scopes are not supported, since they are represented as a tree!*
    customColumns: [
      {
        heading: "Funktion", // ember-intl or string
        slug: "additional-column-function", // relative to "model.metainfo[slug]"
        sortable: true, // whether sorting is supported for this column
        localized: true, // whether to expect a plain value or a object with localized values
      },
    ],
    /*
    On each model edit view (e.g. users) you can define a custom component. The component will be rendered at the bottom of the edit view, but above the primary form buttons. Each component can be designed freely and the model will be passed into the component as `@model` argument. For a working demo have a look at our "dummy-button" at "dummy/app/components/dummy-button".
    */
    customComponent: DummyButton,
    /* 
    Exclusively on USER model - Optionally hide the "active" / "inactive" filter buttons on top of the user list. You can pass
    a function, boolean or string as value.
    */
    filtersVisible: () => true,
    /* 
    Exclusively on USER model - define a custom component which will get displayed next to the 'inacitve' pill on top of the user detail view. Ideally this will be an inline element.
     */
    statusComponent: DummyStatus,
  };

  scope = {
    actions: {
      deactivate: () => false, // statically deactivate the deactivate-button
      // leaving out the "delete" key here will always display the delete button
    },
    // define custom fields for a given context (user, scope, role or permission)
    metaFields: [
      {
        slug: "test-input",
        label: "My Input", // this could also be an ember-intl translation key
        type: "text",
        visible: true,
        readOnly: false,
        required: false, //marks this field as optional
        placeholder: "some.translation.key", //ember-intl translation key or plain string
      },
      {
        slug: "test-input-2",
        label: "some.translation.key",
        options: [
          // insert a static list of options (value, label), or a (async) function which resolves to a list of options
          {
            value: "option-1",
            label: "Option one",
          },
        ],
        type: "choice",
        visible: () => true,
        readOnly: false,
        required: true, //marks this field as required
      },
    ],
  };
}
```

_Watch out_ - the translation key has to be present in your local translation files.

There are special options available for `options`, `type` and `visible` properties.

#### **type** - meta field

Defines the type of the output component and can either be a _text_ or a _choice_.

#### **required** - meta field

Marks this field as optional or validates its presence in case it's set to `true`. Custom _choice_ fields may not be validated as required, tho.

#### **options** - meta field

In combination with `type:"choice"` the options can be a list of options (`{value, label}`) or a (async) function which resolves to a list of options.

#### **visible** & **readOnly** meta field

Accepts a boolean value for static visibility or a (async) function which evaluates to a boolean value. Submitted functions will evaluate live while rendering.

The evaluation function will receive the current model as argument. For instance if you are on the scope route, you will receive the [scope model](addon/models/scope.js) as first argument. Same for [user](addon/models/user.js) | [role](addon/models/role.js) | [permission](addon/models/permission.js)

So the function signature looks like this for `visible` and `readOnly`.

```ts
type visible = (model: scope | user | role | permission) => boolean;
```

And an actual implementation example, which makes use of the `model.name` property:

```js
{
  // ...
  visible: (model) => model.name === "test-scope",
  // ...
}
```

For a complete `emeis-options` configuration open the [test config](tests/dummy/app/services/emeis-options.js).

### Emeis store

If you need to customize your store service passed to emeis, use:
`ember g emeis-store <your_name>`

This will generate a store service and an adapter for you. In those two files
you can then configure custom api endpoints or hosts and/or custom
authentication.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

# License

This project is licensed under the [LGPL-3.0-or-later license](LICENSE).
