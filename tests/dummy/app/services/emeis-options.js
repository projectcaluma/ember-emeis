import Service from "@ember/service";
import { timeout } from "ember-concurrency";

import TestButtonComponent from "../components/dummy-button/dummy-button"; // template and component file must have the same name (if not template only)

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
  customComponents = {
    users: TestButtonComponent,
  };
  actions = {
    user: {
      delete: () => true,
    },
    scope: {
      delete: (model) => model.id !== "special",
      deactivate: (model) => model.id !== "special",
    },
  };
  metaFields = {
    user: [
      {
        slug: "user-meta-example",
        label: "emeis.options.meta.user.example", // ember-intl translation key
        type: "text",
        visible: true,
        readOnly: false,
        required: false,
        placeholder: "emeis.options.meta.user.example",
      },
      // {
      //   slug: "user-meta-example-2",
      //   label: "emeis.options.meta.user.example",
      //   type: "choice", // initially supported: "text", "choice"
      //   options: [
      //     {
      //       value: "Option 1",
      //       label: "Option One",
      //     },
      //     {
      //       value: "Option 2",
      //       label: "Option Two",
      //     },
      //   ],
      //   visible: true,
      //   readOnly: false,
      // },
    ],
    scope: [
      {
        slug: "meta-example",
        label: "emeis.options.meta.scope.meta-example",
        type: "choice", // initially supported: "text", "choice"
        options: async () => {
          await timeout(2000);
          return [
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
          ];
        },
        visible: () => true, // boolean or function which evaluates to a boolean value
        readOnly: false,
        required: false,
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
