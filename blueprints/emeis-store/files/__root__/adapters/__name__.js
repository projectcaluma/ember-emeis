import JSONAPIAdapter from "@ember-data/adapter/json-api";

export default class <%= classifiedModuleName %>Adapter extends JSONAPIAdapter {
  // Configure this to your needs.
  namespace = "/api/v1";
  host = "https://api.example.com";
}
