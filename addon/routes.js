import buildRoutes from "ember-engines/routes";

export default buildRoutes(function () {
  this.route("users", function () {
    this.route("edit", { path: "/:user_id" }, function () {
      this.route("acl");
    });
    this.route("new");
  });
  this.route("scopes", function () {
    this.route("edit", { path: "/:scope_id" }, function () {
      this.route("acl");
    });
    this.route("new");
  });
  this.route("permissions", function () {
    this.route("edit", { path: "/:permission_id" });
    this.route("new");
  });
  this.route("roles", function () {
    this.route("edit", { path: "/:role_id" });
    this.route("new");
  });
});
