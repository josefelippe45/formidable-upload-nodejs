const Pet = require("../models/pets");
const path = require("path");

module.exports = (app) => {
  app.post("/pet", (req, res) => {
    Pet.adiciona(req, res);
  });

  app.post("/pet/download", (req, res) => {
    const { nomeArquivo } = req.body;
    Pet.download(nomeArquivo, res);
  });
};
