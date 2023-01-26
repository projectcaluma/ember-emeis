"use strict";

const { embroiderSafe, embroiderOptimized } = require("@embroider/test-setup");
const getChannelURL = require("ember-source-channel-url");

module.exports = async function () {
  return {
    useYarn: true,
    scenarios: [
      {
        name: "ember-lts-4.8",
        npm: {
          devDependencies: {
            "ember-source": "~4.8.0",
          },
        },
      },
      {
        name: "ember-lts-4.12",
        npm: {
          devDependencies: {
            "ember-source": "~4.12.0",
          },
        },
      },
      {
        name: "ember-release",

        npm: {
          devDependencies: {
            "ember-source": await getChannelURL("release"),
          },
          dependencies: {
            "ember-data": "latest",
          },
        },
      },
      embroiderSafe(),
      embroiderOptimized(),
    ],
  };
};
