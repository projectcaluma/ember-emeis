import { assert } from "@ember/debug";

/**
 * TODO: THIS WAS COPY-PASTED FROM WIGL. CREATE A SEPPARATE PACKAGE FOR THIS!
 *
 * This helper makes it easy to test requests.
 * This is helpful to test if your frontend app sets the query
 * params correctly without needing to recode your backend in
 * mirage to check if requests return correctly.
 *
 * Check that assert.expect always matches the actual number
 * of asserts as it is hard to notice a request assertion which
 * is not triggered.
 *
 * Example:
  this.assertRequest("GET", "/api/v1/articles", request => {
    assert.equal(request.queryParams.categories, "1");
  });

  // Code which triggers a request.

 * The assert function can also be async:
  this.assertRequest("GET", "/api/v1/articles/:id", async request => {
    await somePromise()
    assert.equal(request.queryParams.categories, "1");
  });
 *
 * You can also intercept the request and return your custom response.
 * For this your assert function just needs to return a value:
  this.assertRequest("GET", "/api/v1/articles", request => {
    assert.equal(request.queryParams.categories, "1");
    return [200 , {} , JSON.stringify({data:[])]
  });
 *
 * The return value can either be an array of [status, headers, data] or
 * a collection / model from the mirage schema:
  this.assertRequest("GET", "/api/v1/articles", request => {
    assert.equal(request.queryParams.categories, "1");
    return this.server.schema.articles.find('1')
  });
 *
 * If you get something like this then your path is probably wrong:
 * `Promise rejected during "course filtering glossary": Cannot read property '0' of undefined`
 *
 * @method assertRequest
 * @method {String} A HTTP method in caps (GET, PUT, POST, DELETE).
 * @path {String} The api path on which to intercept. Dynamic segments cant be replaced with :segment-name .
 * @assertFunc {Function} The function to call which takes the request as argument.
 *
 * @author Jonas Cosandey (jonas.cosandey@adfinis-sygroup.ch)
 */
export default function setupRequestAssertions(hooks) {
  hooks.before(function () {
    this.defaultHandlers = [];
    this.assertRequest = function (method, path, assertFunc) {
      assert(
        "assertRequest: Use either GET, POST, DELETE, PATCH or PUT as HTTP method,",
        ["GET", "POST", "DELETE", "PUT", "PATCH"].includes(method)
      );

      const logging = this.server.logging,
        pretender = this.server.pretender,
        originalHandler = getAndCacheDefaultHandler(
          pretender,
          method,
          path,
          this.defaultHandlers
        ),
        server = this.server;

      pretender[method.toLowerCase()](path, async function (request) {
        // Reset the get handler for this path to
        // the default configured in mirage config.
        pretender[method.toLowerCase()](path, originalHandler);

        let response = await assertFunc(request);

        // If the assertFunc returns a value we return the return value instead of the mirage response.
        if (response) {
          // If the returned value is a collection or a model, we serialize it
          // and create a response for the serialized data. If its not a collection
          // or model we just assume its already a response.
          if (server.serializerOrRegistry._isModelOrCollection(response)) {
            const serializer = server.serializerOrRegistry.serializerFor(
              response.modelName
            );
            const serialized = serializer.serialize(response);
            response = [200, null, JSON.stringify(serialized)];
          }

          assert(
            `\nassertRequest Intercepted: ${request.method} ${
              request.url
            }:\nThe response has to be an array of [status, headers, data]\nWas: ${JSON.stringify(
              response
            )}\n`,
            Array.isArray(response)
          );

          if (logging) {
            /* eslint-disable no-console */
            console.groupCollapsed(
              `Intercepted: [${response[0]}] ${request.method} ${request.url}`
            );
            console.log({
              request,
              response: JSON.parse(response.lastObject),
            });
            console.groupEnd();
            /* eslint-enable no-console */
          }

          return response;
        }

        // Let the original handler render the request as we are only
        // intrerested in asserting the request and not modifying it.
        return originalHandler(request);
      });
    };
  });

  hooks.afterEach(function () {
    this.defaultHandlers.forEach(({ method, path, originalHandler }) =>
      this.server.pretender[method.toLowerCase()](path, originalHandler)
    );
    this.defaultHandlers = [];
  });

  hooks.after(function () {
    delete this.assertRequest;
    delete this.assertRequests;
    delete this.defaultHandlers;
  });
}

function getAndCacheDefaultHandler(pretender, method, path, cache) {
  let originalHandler;
  try {
    originalHandler = pretender.hosts.forURL(path)[method].recognize(path)[0]
      .handler;
  } catch (error) {
    if (error instanceof TypeError) {
      throw `assertRequest Intercepted: ${method} ${path}:\nYou tried to assert a url which has no handler configured.\nCheck you mirage config if all routes are defined correctly (and dont forgett to add the id of the model if needed to the assertion url).`;
    }
    throw error;
  }

  if (!cache.find((f) => f.path === path && f.method === method)) {
    cache.push({ method, path, originalHandler });
  }
  return originalHandler;
}
