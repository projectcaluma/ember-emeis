"use strict";

module.exports = {
  description:
    "Generate a seperate emeis store for backend / auth customization.",

  afterInstall(options) {
    this.ui.writeLine(
      `\nFinished! To make your service avaliable in the engine add the following to your engine definitions dependencies in app.js: \`{"store": "${options.entity.name}"}\``
    );
  },
};
