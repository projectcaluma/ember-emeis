import { attr } from "@ember-data/model";

export default function (...args) {
  const [target, name] = args;

  const attrComputed = attr(...args);
  const { get: getter, set: setter } = attrComputed;

  target.localizedFields = [...(target.localizedFields || []), name];

  attrComputed.get = function () {
    const value = getter.call(this);

    return value && value[this.getFieldLocale()];
  };

  attrComputed.set = function (value) {
    let attribute = getter.call(this);

    if (!attribute) {
      attribute = this.intl.locales.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue]: "",
        }),
        {}
      );
    }

    attribute[this.getFieldLocale()] = value;
    setter.call(this, attribute);
  };

  Object.defineProperty(target, `_${name}`, {
    get() {
      return getter.call(this);
    },
    set(value) {
      setter.call(this, value);
    },
  });

  return attrComputed;
}
