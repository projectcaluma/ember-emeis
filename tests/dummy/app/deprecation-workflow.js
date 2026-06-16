import setupDeprecationWorkflow from "ember-cli-deprecation-workflow";

/**
 * Docs: https://github.com/ember-cli/ember-cli-deprecation-workflow
 */
setupDeprecationWorkflow({
  /**
    false by default, but if a developer / team wants to be more aggressive about being proactive with
    handling their deprecations, this should be set to "true"
  */
  throwOnUnhandled: true,
  workflow: [
    { handler: "silence", matchId: "importing-inject-from-ember-service" }, // until: ember-source v7.0
    {
      handler: "silence",
      matchId: "ember-data:deprecate-non-strict-relationships",
    }, // until: ember-data v5.0
    { handler: "silence", matchId: "ember-data:deprecate-array-like" }, // until: ember-data v5.0
    { handler: "silence", matchId: "ember-data:no-a-with-array-like" }, // until: ember-data v5.0
    {
      handler: "silence",
      matchId: "ember-concurrency.deprecate-decorator-task",
    }, // until: ember-concurrency v5.0
    {
      handler: "silence",
      matchId: "ember-concurrency.deprecate-decorator-last-value",
    }, // until: ember-concurrency v5.0
    {
      handler: "silence",
      matchId: "ember-power-select.deprecate-power-select-multiple",
    }, // until: ember-power-select v9.0
    {
      handler: "silence",
      matchId: "ember-power-select.deprecate-power-select-multiple-trigger",
    }, // until: ember-power-select v9.0
    {
      handler: "silence",
      matchId: "ember-power-select.deprecate-power-select-multiple-input",
    }, // until: ember-power-select v9.0
  ],
});
