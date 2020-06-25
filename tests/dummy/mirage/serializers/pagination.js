import { JSONAPISerializer } from "ember-cli-mirage";
const { ceil } = Math;

export default class PaginationSerializer extends JSONAPISerializer {
  serialize(...params) {
    const [
      ,
      {
        queryParams: { "page[number]": page, "page[size]": limit } = {},
        method,
      } = {},
    ] = params;

    const json = super.serialize(...params);

    if (method === "GET" && Array.isArray(json.data)) {
      if (page && limit) {
        const parsedPage = parseInt(page),
          parsedLimit = parseInt(limit);

        json.meta = {
          pagination: {
            parsedPage,
            pages: ceil(json.data.length / parsedLimit),
          },
        };

        json.data = json.data.slice(
          (parsedPage - 1) * parsedLimit,
          parsedPage * parsedLimit
        );
      }
    }

    return json;
  }
}
