export default function () {
  this.urlPrefix = "";
  this.namespace = "/api/v1";
  this.timing = 400;

  this.get("/scopes");
  this.post("/scopes");
  this.get("/scopes/:id");
  this.put("/scopes/:id");
  this.del("/scopes/:id");
}
