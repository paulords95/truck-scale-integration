const Service = require("node-windows").Service;
const svc = new Service({
  name: "Balança Portaria",
  description: "Peso Balança Portaria em GET",
  script:
    "C:\\localapps\\Balança Rodoviária API\\index.js",
  env: {
    value: process.env.USER,
  },
});
svc.on("install", function () {
  svc.start();
});
svc.install();


