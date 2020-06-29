# ember-emeis

![Test](https://github.com/projectcaluma/ember-emeis/workflows/Test/badge.svg)
[![Dependabot](https://badgen.net/dependabot/projectcaluma/ember-caluma/?icon=dependabot)](https://dependabot.com/)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![License: LGPL-3.0](https://img.shields.io/badge/License-LGPL--3.0-blue.svg)](https://spdx.org/licenses/LGPL-3.0-or-later.html)

The frontend for the [emeis](https://github.com/projectcaluma/emeis) user management service

## Compatibility

- Ember latest LTS (3.16)

## Installation

```bash
$ ember install ember-emeis
```

Then add the following lines to your `app/styles/app.scss`:

```scss
@import "ember-uikit";
@import "ember-emeis";
```

## Configuration
If you need to customize your store service passed to emeis, use:
`ember g emeis-store <your_name>`

This will generate a store service and an adapter for you. In those two files
 you can then configure custom api endpoints or hosts and/or custom
authentication.

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

# License

This project is licensed under the [LGPL-3.0-or-later license](LICENSE).
