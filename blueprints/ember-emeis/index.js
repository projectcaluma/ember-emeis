"use strict";

module.exports = {
  normalizeEntityName() {},
  afterInstall() {
    return this.addAddonsToProject({
      packages: [
        { name: "ember-data" },
        { name: "ember-intl" },
        { name: "ember-uikit" },
      ],
    });
  },
};
