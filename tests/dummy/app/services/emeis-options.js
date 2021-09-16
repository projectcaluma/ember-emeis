import Service from "@ember/service";

export default class EmeisOptionsService extends Service {
  emailAsUsername = false;
  pageSize = 10;
  // additionalUserFields = {
  //   phone: "optional",
  //   language: "optional",
  // };
  // navigationEntries = ["users", "scopes"];
  metaFields = {
    scope: [
      {
        slug: "meta-example",
        label: {
          en: "Example for custom choice field",
          de: "Beispiel für benutzerdefiniertes Dropdown-Feld",
        },
        type: "choice", // initially supported: "text", "choice"
        options: [
          {
            value: "option-1",
            label: {
              en: "Ham",
              de: "Schinken",
            },
          },
          {
            value: "Option 2",
            label: {
              en: "Cheese",
              de: "Käse",
            },
          },
          {
            value: "Option 3",
            label: {
              en: "Onion",
              de: "Zwiebel",
            },
          },
        ],
        visible: true,
        readOnly: false,
      },
      {
        slug: "meta-example-2",
        label: {
          en: "Example for custom text field",
          de: "Beispiel für benutzerdefiniertes Textfeld",
        },
        type: "text",
        visible: true,
        readOnly: false,
      },
    ],
  };
}
