const pool = require("../config/db");

class Nota {
  static async listarTodas() {
    const resultado = await pool.query(
      "SELECT * FROM notas ORDER BY criado_em DESC"
    );
    return resultado.rows;
  }

  static async criar(titulo, conteudo) {
    if (!titulo) {
      throw new Error("Título é obrigatório");
    }

    const resultado = await pool.query(
      "INSERT INTO notas (titulo, conteudo) VALUES ($1, $2) RETURNING *",
      [titulo, conteudo]
    );
    return resultado.rows[0];
  }

  static async remover(id) {
    await pool.query("DELETE FROM notas WHERE id = $1", [id]);
  }
}

module.exports = Nota;
