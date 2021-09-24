const fs = require("fs");

module.exports = (nomeArquivo, callback) => {
  const caminhoOriginal = `./assets/${nomeArquivo}`;
  const arquivoExiste = fs.existsSync(caminhoOriginal);
  let novoCaminho = `./assets/download/${nomeArquivo}`;

  const downloadExiste = fs.existsSync(novoCaminho);

  if (downloadExiste) {
    callback("O download dessa imagem já foi feito");
  }

  if (arquivoExiste) {
    fs.readFile(caminhoOriginal, (_, buffer) =>
      fs.writeFile(novoCaminho, buffer, () => callback())
    );
  } else {
    callback("Imagem não encontrada no servidor");
  }
};
