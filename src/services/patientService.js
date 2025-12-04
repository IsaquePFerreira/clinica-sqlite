import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@clinica_pacientes_v1";

async function readDB() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : { pacientes: [], consultas: [] };
}
async function writeDB(db) {
  await AsyncStorage.setItem(KEY, JSON.stringify(db));
}

// Pacientes
export async function createPatient({ nome, telefone, idade }) {
  const db = await readDB();
  const id = Date.now();
  db.pacientes.push({ id, nome, telefone, idade: idade ?? null });
  await writeDB(db);
  return id;
}

export async function getAllPatients() {
  const db = await readDB();
  // ordena por nome
  return db.pacientes.sort((a,b)=> String(a.nome).localeCompare(String(b.nome)));
}

export async function getPatientById(id) {
  const db = await readDB();
  return db.pacientes.find(p => p.id === id);
}

export async function updatePatient(id, { nome, telefone, idade }) {
  const db = await readDB();
  const idx = db.pacientes.findIndex(p => p.id === id);
  if (idx >= 0) {
    db.pacientes[idx] = { id, nome, telefone, idade: idade ?? null };
    await writeDB(db);
  }
}

export async function deletePatient(id) {
  const db = await readDB();
  // Remove paciente e suas consultas
  db.pacientes = db.pacientes.filter(p => p.id !== id);
  db.consultas = db.consultas.filter(c => c.paciente_id !== id);
  await writeDB(db);
}
