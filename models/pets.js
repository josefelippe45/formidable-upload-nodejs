const conexao = require("../infra/database/conexao");
const uploadDeArquivo = require("../infra/files/uploadDeArquivos.js");
const downloadDeArquivo = require("../infra/files/downloadDeArquivo.js");

class Pet {
  adiciona(req, res) {
    const query = "INSERT INTO Pets SET ?";
    uploadDeArquivo(req, (erro) => {
      if (erro) {
        res.status(400).json({ erro });
      } else {
        res.status(200).json({ message: "sucesso" });
      }
    });
  }
  download(nomeArquivo, res) {
    downloadDeArquivo(nomeArquivo, (erro) => {
      if (erro) {
        res.status(404).json({ erro });
      }
      res.status(200).json({ message: "Download realizado com sucesso!" });
    });
  }
}

module.exports = new Pet();
