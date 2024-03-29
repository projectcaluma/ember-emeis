import { faker } from "@faker-js/faker";

export default class {
  constructor() {
    this.ids = new Set();
  }

  // Returns a new unused unique identifier.
  fetch() {
    let uuid = faker.datatype.uuid();
    while (this.ids.has(uuid)) {
      uuid = faker.datatype.uuid();
    }

    this.ids.add(uuid);

    return uuid;
  }

  // Registers an identifier as used. Must throw if identifier is already used.
  set(id) {
    if (this.ids.has(id)) {
      throw new Error(`ID ${id} has already been used.`);
    }

    this.ids.add(id);
  }

  // Resets all used identifiers to unused.
  reset() {
    this.ids.clear();
  }
}
