# ember-emeis

![Test](https://github.com/projectcaluma/ember-emeis/workflows/Test/badge.svg)
[![Dependabot](https://badgen.net/dependabot/projectcaluma/ember-caluma/?icon=dependabot)](https://dependabot.com/)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: LGPL-3.0](https://img.shields.io/badge/License-LGPL--3.0-blue.svg)](https://spdx.org/licenses/LGPL-3.0-or-later.html)

The frontend for the [emeis](https://github.com/projectcaluma/emeis) user management service

## Compatibility

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v10 or above

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
    emberEmeis: {
      dependencies: {
        services: ["store", "intl", "notification", "router"],
      },
    },
  };
}
});
```

## Configuration

### Emeis options

Basic configuration of ember-emeis can be done via the `emeis-options` service. To generate it, run `ember g service emeis-options` and add it to the dependencies in `app/app.js`:

```js
export default class App extends Application {
  // ...

  this.engines = {
    emberEmeis: {
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

export default class EmeisOptionsService extends Service {
  // number of items in list views
  pageSize = 10;

  // hide "username" field
  emailAsUsername = false;

  // show only a subset of the "additional" fields on the user model
  additionalUserFields = ["phone", "language", "address", "city", "zip"];

  // show only a subset of the main navigation entries
  navigationEntries = ["users", "scopes"];
}
```

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
