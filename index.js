"use strict";

const { buildEngine } = require("ember-engines/lib/engine-addon");

module.exports = buildEngine({
  name: require("./package").name,
  lazyLoading: { enabled: false },
  babel: {
    plugins: [require.resolve("ember-concurrency/async-arrow-task-transform")],
  },
});
