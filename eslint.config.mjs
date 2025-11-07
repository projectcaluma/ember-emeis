import adfinisEmberAddonConfig from "@adfinis/eslint-config/ember-addon";
import ember from "eslint-plugin-ember";

export default [
  ...adfinisEmberAddonConfig,
  {
    ignores: ["blueprints/**", "node_modules/**"],
  },
  {
    plugins: { ember },
    settings: {
      "import/internal-regex": "^ember-emeis/",
    },
    rules: {
      "ember/no-settled-after-test-helper": "warn",
    },
  },
];
