# How To Contribute

## Installation

- `git clone git@github.com:projectcaluma/ember-emeis`
- `cd ember-emeis`
- `yarn install`

## Linting

- `yarn lint:hbs`
- `yarn lint:js`
- `yarn lint:js --fix`

## Running tests

- `ember test` – Runs the test suite on the current Ember version
- `ember test --server` – Runs the test suite in "watch mode"
- `ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application (mirage backend)

- `yarn start`
- Visit the dummy application at [http://localhost:4200](http://localhost:4200).

## Running the dummy application (real backend)

- set up `emeis` (see [docs](https://github.com/projectcaluma/emeis))
- `yarn start-proxy`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
