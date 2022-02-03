import { assert } from "@ember/debug";
import UIkit from "uikit";

import ENV from "ember-emeis/config/environment";

/**
 * This decorator makes heavy use of the UIKit modal. If anything breaks in future releases, it could be
 * caused by the use of non-public API in this decorator.
 *
 * For further details have a look at: https://github.com/uikit/uikit/blob/develop/src/js/core/modal.js
 */

const LABELS = ["message", "ok", "cancel"];

async function confirm(text, options) {
  try {
    await UIkit.modal.confirm(text, options);
    return true;
  } catch (error) {
    return false;
  }
}

function initOptions(args) {
  if (args.length === 1) {
    assert(
      "You should pass the confirm-task options as an object looking like this: { message: 'emeis.form.deleteMessage', cancel: 'emeis.form.back' } ",
      typeof args[0] === "object"
    );
    return args[0];
  }
  return {};
}

function validateIntl(context) {
  assert(
    "Inject the `intl` service into your component to properly translate the modal dialog.",
    context.intl
  );
}

function translateOptions(context, options) {
  const translated = {};
  for (const key in options) {
    if (LABELS.includes(key) && context.intl.exists(options[key])) {
      translated[key] = context.intl.t(options[key]);
    }
  }
  return {
    labels: {
      // set some defaults
      message: context.intl.t("emeis.form.confirmText"),
      ok: context.intl.t("emeis.form.ok"),
      cancel: context.intl.t("emeis.form.cancel"),
      // add the override with the transmitted options
      ...translated,
    },
  };
}

function filterOptions(options) {
  const filteredOptions = Object.fromEntries(
    Object.entries(options).filter(([key]) => !LABELS.includes(key))
  );

  if (ENV.environment === "test") {
    filteredOptions.container = "#ember-testing";
  }
  return filteredOptions;
}

// make sure that decorator can be called with or without arguments
const makeFlexibleDecorator = (decorateFn, args) => {
  if (args.length === 3 && !args[0].message) {
    // We can assume that the decorator was called without options
    return decorateFn(...args);
  }

  return decorateFn;
};

export function confirmTask(...decoratorArgs) {
  const options = initOptions(decoratorArgs);

  function decorate(target, property, desc) {
    const gen = desc.value;

    desc.value = function* (...args) {
      const event = args.find((arg) => arg instanceof Event);

      if (event) {
        event.preventDefault();
      }

      validateIntl(this);
      const translatedOptions = translateOptions(this, options);
      // append other options which are not confirm-labels to the modal object
      // that way you can modify the modal with further options like "container"
      const filteredOptions = filterOptions(options);
      if (
        !(yield confirm(translatedOptions.labels.message, {
          ...translatedOptions,
          ...filteredOptions,
        }))
      ) {
        return;
      }
      return yield* gen.apply(this, args);
    };
  }
  return makeFlexibleDecorator(decorate, decoratorArgs);
}
