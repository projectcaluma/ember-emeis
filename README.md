# ember-emeis

![Test](https://github.com/projectcaluma/ember-emeis/workflows/Test/badge.svg)
[![Dependabot](https://badgen.net/github/dependabot/projectcaluma/ember-emeis/?icon=dependabot)](https://dependabot.com/)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: LGPL-3.0](https://img.shields.io/badge/License-LGPL--3.0-blue.svg)](https://spdx.org/licenses/LGPL-3.0-or-later.html)

The frontend for the [emeis](https://github.com/projectcaluma/emeis) user management service

## Compatibility

- Ember.js v3.20 or above
- Ember CLI v3.20 or above
- Node.js v10 or above

## Installation

```bash
$ ember install ember-emeis
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
        services: ["store", "fetch", "intl", "notification", "router"],
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
- `router` - the ember router service

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

  // show only a subset of the "additional" fields on the user model
  additionalUserFields = {
    "phone": "required",
    "language": "required",
    "address": "optional",
    "city": "optional",
    "zip": "optional"
  ];

  // show only a subset of the main navigation entries
  navigationEntries = ["users", "scopes"];

  /*
   On each model edit view (e.g. users) you can define a custom component. The component will be rendered at the bottom of the edit view, but above the primary form buttons. Each component can be designed freely and the model will be passed into the component as `@model` argument. For a working demo have a look at our "dummy-button" at "dummy/app/components/dummy-button".
  */
  customComponents = {
    users: DummyButton,
  },
  // define custom fields for a given context (user, scope, role or permission)
  metaFields = {
    user: [],
    scope: [
      {
        slug: "test-input",
        label: "My Input", // this could also be an ember-intl translation key
        type: "text",
        visible: true,
        readOnly: false
      },
      {
        slug: "test-input-2",
        label: "some.translation.key",
        type: "choice",
        visible: () => true,
        readOnly: false
      }
    ]
  }
}
```

_Watch out_ - the translation key has to be present in your local translation files.

There are special options available for `type` and `visible` properties.

#### **type** - meta field

Defines the type of the output component and can either be a _text_ or a _choice_.

#### **visible** & **readOnly** meta field

Accepts a boolean value for static visibility or a function which evaluates to a boolean value. Submitted functions will evaluate live while rendering.

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

<3
