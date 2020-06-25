import JSONAPISerializer from "@ember-data/serializer/json-api";

export default class ScopeSerializer extends JSONAPISerializer {
  serializeAttribute(snapshot, json, key, attributes) {
    super.serializeAttribute(snapshot, json, key, attributes);
    if (snapshot.record.localizedFields.includes(key)) {
      json.attributes[key] = snapshot.record.getUnlocalizedField(key);
    }
  }
}
