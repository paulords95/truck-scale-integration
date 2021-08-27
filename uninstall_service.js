var Service = require("node-windows").Service;
var svc = new Service({
  name: "Balança Portaria",
  description: "Peso Balança Portaria em GET",
  script:
    "C:\\localapps\\Balança Rodoviária API\\index.js",
});
svc.on("uninstall", function () {
  console.log("Uninstall complete.");
});
svc.uninstall();
