const query = require("../infra/database/queries");

class Atendimento {
  adiciona(atendimento) {
    console.log(atendimento);
    const sql = "INSERT INTO Atendimentos SET ?";
    return query(sql, atendimento);
  }

  lista() {
    const sql = "SELECT * FROM Atendimentos";
    return query(sql);
  }
}

module.exports = new Atendimento();
