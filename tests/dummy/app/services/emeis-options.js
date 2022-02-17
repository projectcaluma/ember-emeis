import Service from "@ember/service";

export default class EmeisOptionsService extends Service {
  emailAsUsername = false;
  pageSize = 10;
  // forceLocale = {
  //   scope: "en",
  // };
  // additionalUserFields = {
  //   phone: "optional",
  //   language: "optional",
  // };
  // navigationEntries = ["users", "scopes"];
  customButtons = {
    users: [
      {
        label: "This is a custom button",
        callback: () => console.warn("test"),
        type: "primary",
      },
      {
        label: "Second Button",
        callback: () => console.warn("test"),
      },
    ],
  };
  metaFields = {
    user: [
      {
        slug: "user-meta-example",
        label: "emeis.options.meta.user.example", // ember-intl translation key
        type: "text",
        visible: true,
        readOnly: false,
      },
    ],
    scope: [
      {
        slug: "meta-example",
        label: "emeis.options.meta.scope.meta-example",
        type: "choice", // initially supported: "text", "choice"
        options: [
          {
            value: "Option 1",
            label: "emeis.options.meta.scope.options.label-1", // again a ember-intl translation key
          },
          {
            value: "Option 2",
            label: "emeis.options.meta.scope.options.label-2",
          },
          {
            value: "Option 3",
            label: "emeis.options.meta.scope.options.label-3",
          },
        ],
        visible: () => true, // boolean or function which evaluates to a boolean value
        readOnly: false,
      },
      {
        slug: "meta-example-2",
        label: "emeis.options.meta.scope.meta-example-2",
        type: "text",
        visible: (model) => model?.name === "First Level Scope",
        readOnly: (model) => model?.level === 0,
      },
    ],
  };
}
