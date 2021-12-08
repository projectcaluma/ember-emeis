export default function (server) {
  const root = server.create("scope");
  const level1 = server.createList("scope", 3, { level: 1, parent: root });
  server.createList("scope", 2, { level: 2, parent: level1[0] });
  server.create("scope", {
    id: "special",
    name: { en: "scope with static ID" },
    level: 2,
    parent: level1[0],
  });
  server.createList("user", 50);
  server.createList("permission", 50);
  server.createList("role", 50);
  server.createList("acl", 50, { scope: root });
}
