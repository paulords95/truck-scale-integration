const express = require("express");
const app = express();

const fs = require("fs");

const path = require("path");
const fullPathAdress = path.resolve("./address.json");

let rawdata = fs.readFileSync(fullPathAdress);
let address = JSON.parse(rawdata);

const Net = require("net");
const port = address.conversor.port;
const host = address.conversor.ip;

app.use(express.json());

const client = new Net.Socket();

let responses = [];

client.connect({ port: port, host: host }, function (e) {
  console.log("Conectado a balança");
});

client.on("data", function (chunk) {
  const data = chunk.toString("utf8").replace(/\D/g, "");

  if (responses.length >= 3) {
    responses.shift();
  }
  if (data.length === 12) {
    responses.push(data);
  }
});

client.on("error", function (error) {
  console.log(error);
});

function isValidWeight() {
  return responses.every((val, i, arr) => val === arr[0]);
}

app.get("/peso-balanca", async (req, res) => {
  if (isValidWeight()) {
    const weight = responses[0].slice(1, 6);
    res.send(weight.toString());
  } else {
    res.send("Aguardando estabilização da pesagem");
  }
});

app.listen(4000, () => {
  console.log(`Servidor rodando na porta 4000`);
});
