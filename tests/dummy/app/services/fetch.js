import Service from "@ember/service";
import { isEmpty } from "@ember/utils";

const cleanObject = (obj) => {
  return Object.entries(obj).reduce((clean, [key, value]) => {
    return {
      ...clean,
      ...(isEmpty(value) ? {} : { [key]: value }),
    };
  }, {});
};

export default class FetchService extends Service {
  async fetch(resource, init = {}) {
    init.headers = cleanObject({
      ...this.headers,
      ...(init.headers || {}),
    });

    const response = await fetch(resource, init);
    if (!response.ok) {
      if (response.status === 401) {
        // handle unauthorized case
        return;
      }

      const contentType = response.headers.get("content-type");
      let body = "";

      if (/^application\/(vnd\.api+)?json$/.test(contentType)) {
        body = await response.json();
      } else if (contentType === "text/plain") {
        body = await response.text();
      }

      // throw an error containing a human readable message
      throw {
        response,
        body,
        error: new Error(
          `Fetch request to URL ${response.url} returned ${response.status} ${response.statusText}:\n\n${body}`
        ),
      };
    }

    return response;
  }

  get headers() {
    return {
      // authorization: "Bearer 123123123",
    };
  }
}
