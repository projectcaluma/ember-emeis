"use strict";

module.exports = function (environment) {
  const ENV = {
    modulePrefix: "ember-emeis",
    environment,

    "ember-emeis": {
      pageSize: 25,
    },
  };

  if (environment === "test") {
    ENV["ember-emeis"].pageSize = 10;
  }

  return ENV;
};
