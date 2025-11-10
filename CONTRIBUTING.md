# How To Contribute

## Installation

- `git clone git@github.com:projectcaluma/ember-emeis`
- `cd ember-emeis`
- `pnpm install`

## Linting

- `pnpm lint`
- `pnpm lint:fix`

## Running tests

- `ember test` – Runs the test suite on the current Ember version
- `ember test --server` – Runs the test suite in "watch mode"
- `ember try:each` – Runs the test suite against multiple Ember versions

## Running the dummy application (mirage backend)

- `pnpm start`
- Visit the dummy application at [http://localhost:4200](http://localhost:4200).

## Running the dummy application (real backend)

- set up `emeis` (see [docs](https://github.com/projectcaluma/emeis))
- `pnpm start-proxy`

For more information on using ember-cli, visit [https://cli.emberjs.com/release/](https://cli.emberjs.com/release/).
