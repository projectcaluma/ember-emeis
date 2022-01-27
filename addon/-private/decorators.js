import { assert } from "@ember/debug";

const catchErrors = (context, args, exception) => {
  const [
    {
      routeFor404,
      errorMessage = "emeis.general-error",
      notFoundErrorMessage = "emeis.not-found",
    } = {},
  ] = args;
  // Transition to route if 404 recieved and routeFor404 is set
  if (
    routeFor404 &&
    exception.isAdapterError &&
    exception.errors[0].status === "404"
  ) {
    context.notification.danger(context.intl.t(notFoundErrorMessage));
    context.replaceWith(routeFor404);
  } else {
    console.error(exception);
    if (
      !exception.errors ||
      !exception.errors.map((e) => e.detail).filter(Boolean).length
    ) {
      context.notification.danger(context.intl.t(errorMessage));
      return;
    }
    exception.errors?.forEach(({ detail }) => {
      context.notification.danger(detail);
    });
  }
};

const validate = (context) => {
  assert(
    "Inject the `notification` as well as the `intl` service into your route to properly display errors.",
    context.notification && context.intl
  );
};

// make sure that decorator can be called with or without arguments
const makeFlexibleDecorator = (decorateFn, args) => {
  if (args.length === 3 && !args[0].routeFor404 && !args[0].errorMessage) {
    // We can assume that the decorator was called without options
    return decorateFn(...args);
  }

  return decorateFn;
};

export function handleModelErrors(...decoratorArgs) {
  function decorate(target, name, descriptor) {
    const originalDescriptor = descriptor.value;

    descriptor.value = function (...args) {
      validate(this);
      try {
        const result = originalDescriptor.apply(this, args);
        return result?.then
          ? result.catch((exception) =>
              catchErrors(this, decoratorArgs, exception)
            )
          : result;
      } catch (exception) {
        catchErrors(this, decoratorArgs, exception);
      }
    };
  }

  return makeFlexibleDecorator(decorate, decoratorArgs);
}

export function handleTaskErrors(...decoratorArgs) {
  function decorate(target, property, desc) {
    const gen = desc.value;

    desc.value = function* (...args) {
      validate(this);
      try {
        return yield* gen.apply(this, args);
      } catch (exception) {
        catchErrors(this, decoratorArgs, exception);
      }
    };
  }
  return makeFlexibleDecorator(decorate, decoratorArgs);
}
