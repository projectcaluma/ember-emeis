"use strict";

module.exports = {
  settings: {
    "import/internal-regex": "^ember-emeis/",
  },
  extends: ["@adfinis/eslint-config/ember-addon"],
  rules: {
    "ember/no-settled-after-test-helper": "warn",
  },
};
