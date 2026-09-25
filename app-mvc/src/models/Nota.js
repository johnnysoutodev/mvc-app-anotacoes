const pool = require("../config/db");

class Nota {
  static async listarTodas() {
    // Regra de negócio: favoritas aparecem primeiro, depois as mais recentes
    const resultado = await pool.query(
      "SELECT * FROM notas ORDER BY favorita DESC, criado_em DESC"
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
    if (!Number.isInteger(Number(id))) {
      throw new Error("Id inválido");
    }

    await pool.query("DELETE FROM notas WHERE id = $1", [id]);
  }

  static async alternarFavorita(id) {
    if (!Number.isInteger(Number(id))) {
      throw new Error("Id inválido");
    }

    const resultado = await pool.query(
      "UPDATE notas SET favorita = NOT favorita WHERE id = $1 RETURNING *",
      [id]
    );

    if (resultado.rows.length === 0) {
      throw new Error("Nota não encontrada");
    }
    return resultado.rows[0];
  }
}

module.exports = Nota;
