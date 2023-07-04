import Service from "@ember/service";
import { isTesting, macroCondition } from "@embroider/macros";
import { timeout } from "ember-concurrency";

import TestButtonComponent from "../components/dummy-button/dummy-button"; // template and component file must have the same name (if not template only)
import TestStatusComponent from "../components/dummy-status/dummy-status"; // template and component file must have the same name (if not template only)

export default class EmeisOptionsService extends Service {
  emailAsUsername = false;
  pageSize = 10;
  // forceLocale = {
  //   scope: "en",
  // };
  // navigationEntries = ["users", "scopes"];

  // user view specific settings
  user = {
    actions: {
      delete: () => true,
    },
    // additionalFields: {
    //   phone: "optional",
    //   language: "optional",
    // }
    customColumns: [
      {
        heading: "something meta", // ember-intl or string
        slug: "megameta", // relative to "model.metainfo[slug]"
        sortable: true, // whether sorting is supported for this column
        localized: true, // whether to expect a plain value or a object with localized values
      },
    ],
    customComponent: TestButtonComponent,
    filtersVisible: () => true,
    metaFields: [
      {
        slug: "megameta",
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
    statusComponent: TestStatusComponent,
  };

  // scope view specific settings
  scope = {
    actions: {
      delete: (model) => model.id !== "special",
      deactivate: {
        label: (model) =>
          model.isActive ? "my deactivate label" : "my reactivate label",
        func: (model) => model.id !== "special",
      },
    },
    metaFields: [
      {
        slug: "meta-example",
        label: "emeis.options.meta.scope.meta-example",
        type: "choice", // initially supported: "text", "choice"
        options: async () => {
          if (macroCondition(!isTesting())) {
            await timeout(2000);
          }
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
