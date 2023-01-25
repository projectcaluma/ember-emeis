"use strict";

/* eslint-disable ember/avoid-leaking-state-in-ember-objects, n/no-unpublished-require */

const { buildEngine } = require("ember-engines/lib/engine-addon");

module.exports = buildEngine({
  name: require("./package").name,
  lazyLoading: { enabled: false },
});
