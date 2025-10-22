import Application from "@ember/application";
import { importSync, isDevelopingApp, macroCondition } from "@embroider/macros";
import config from "dummy/config/environment";
import loadInitializers from "ember-load-initializers";
import Resolver from "ember-resolver";

if (macroCondition(isDevelopingApp())) {
  importSync("./deprecation-workflow");
}

export default class App extends Application {
  modulePrefix = config.modulePrefix;
  podModulePrefix = config.podModulePrefix;
  Resolver = Resolver;

  constructor(...args) {
    super(...args);

    this.engines = {
      "ember-emeis": {
        dependencies: {
          services: [
            "store",
            "fetch",
            "intl",
            "notification",
            { "host-router": "router" },
            "emeis-options",
          ],
        },
      },
    };
  }
}

loadInitializers(App, config.modulePrefix);
