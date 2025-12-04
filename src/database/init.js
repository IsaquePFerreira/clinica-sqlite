export default async function initializeDatabase(db) {
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS pacientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        telefone TEXT
      );

      CREATE TABLE IF NOT EXISTS consultas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data_hora TEXT NOT NULL,
        descricao TEXT,
        paciente_id INTEGER,
        FOREIGN KEY(paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
      );
    `);

    console.log("Banco inicializado com sucesso!");
  } catch (error) {
    console.log("Erro ao iniciar banco:", error);
  }
}
