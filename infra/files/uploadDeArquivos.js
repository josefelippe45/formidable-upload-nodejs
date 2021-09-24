const fs = require("fs");
const formidable = require("formidable");
const path = require("path");
const validarArquivo = require("../../utils/validarArquivo");

function nomeiaArquivo(diretorioUpload, arquivo, nomeArquivo) {
  const diretorio = path.join(diretorioUpload, nomeArquivo);
  const somenteNumeros = /[^\d]/g;
  const dataAtual = new Date()
    .toLocaleDateString()
    .replace(somenteNumeros, "_");

  if (fs.existsSync(diretorio)) {
    nomeArquivo = `${nomeArquivo.split(".")[0]}_${dataAtual}.${
      nomeArquivo.split(".")[1]
    }`;
  }
  fs.renameSync(arquivo.path, path.join(diretorioUpload, nomeArquivo));
}

function configuraUpload(form, diretorio) {
  form.maxFileSize = 50 * 1024 * 1024;
  form.uploadDir = diretorio;
}

function validaTipo(arquivo, callback) {
  const ehValido = validarArquivo(arquivo.type);
  if (!ehValido) {
    return callback("Tipo inválido");
  }
}

module.exports = (req, callback) => {
  const form = new formidable.IncomingForm();
  const diretorioUpload = path.join("assets", "upload");
  configuraUpload(form, diretorioUpload);
  form.parse(req, async (erro, _, arquivos) => {
    if (erro) {
      return callback(erro);
    }
    const { file: arquivo } = arquivos;
    validaTipo(arquivo, callback);
    const arquivoFormatado = encodeURIComponent(arquivo.name);
    try {
      nomeiaArquivo(diretorioUpload, arquivo, arquivoFormatado);
    } catch (error) {
      return callback(error);
    }
    return callback(false);
  });
};
