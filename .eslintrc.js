"use strict";

module.exports = {
  settings: {
    "import/internal-regex": "^ember-emeis/",
  },
  extends: ["@adfinis-sygroup/eslint-config/ember-addon"],
  rules: {
    "ember/no-settled-after-test-helper": "warn",
  },
};
