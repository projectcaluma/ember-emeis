"use strict";

/* eslint-disable ember/avoid-leaking-state-in-ember-objects, node/no-unpublished-require */

const EngineAddon = require("ember-engines/lib/engine-addon");

module.exports = EngineAddon.extend({
  name: require("./package").name,
  lazyLoading: { enabled: false },
});
