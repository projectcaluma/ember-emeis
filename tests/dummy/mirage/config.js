export default function () {
  this.urlPrefix = "";
  this.namespace = "/api/v1";
  this.timing = 400;

  this.get("/scopes");
  this.post("/scopes");
  this.get("/scopes/:id");
  this.patch("/scopes/:id");
  this.put("/scopes/:id");
  this.del("/scopes/:id");

  this.get("/permissions");
  this.post("/permissions");
  this.get("/permissions/:id");
  this.patch("/permissions/:id");
  this.put("/permissions/:id");
  this.del("/permissions/:id");

  this.get("/users");
  this.post("/users");
  this.get("/users/:id");
  this.patch("/users/:id");
  this.put("/users/:id");
  this.del("/users/:id");

  this.get("/roles");
  this.post("/roles");
  this.get("/roles/:id");
  this.patch("/roles/:id");
  this.put("/roles/:id");
  this.del("/roles/:id");

  this.get("/acls");
  this.post("/acls");
  this.get("/acls/:id");
  this.patch("/acls/:id");
  this.put("/acls/:id");
  this.del("/acls/:id");
}
