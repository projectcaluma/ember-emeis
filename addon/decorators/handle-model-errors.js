import { assert } from "@ember/debug";

export default function (...args) {
  const [{ routeFor404, errorMessage = "emeis.not-found" } = {}] = args;

  const decorate = function (target, name, descriptor) {
    const originalDescriptor = descriptor.value;

    descriptor.value = function (...args) {
      assert(
        "Inject the `notification` as well as the `intl` service into your route to properly display errors.",
        this.notification && this.intl
      );

      const catchErrors = (exception) => {
        if (
          routeFor404 &&
          exception.isAdapterError &&
          exception.errors[0].status === "404"
        ) {
          this.notification.danger(this.intl.t(errorMessage));
          this.replaceWith(routeFor404);
        } else {
          this.notification.danger(this.intl.t("emeis.general-error"));
        }
      };

      try {
        const result = originalDescriptor.apply(this, args);
        return result.then ? result.catch(catchErrors) : result;
      } catch (exception) {
        catchErrors(exception);
      }
    };
  };

  // We can assume that the decorator was called without options
  if (args.length === 3 && !args[0].routeFor404 && !args[0].errorMessage) {
    return decorate(...args);
  }

  return decorate;
}
