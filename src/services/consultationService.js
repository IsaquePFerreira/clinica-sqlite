import AsyncStorage from "@react-native-async-storage/async-storage";
const KEY = "@clinica_pacientes_v1";

async function readDB() {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) : { pacientes: [], consultas: [] };
}
async function writeDB(db) {
  await AsyncStorage.setItem(KEY, JSON.stringify(db));
}

export async function createConsultation({ paciente_id, data, descricao }) {
  const db = await readDB();
  const id = Date.now();
  db.consultas.push({ id, paciente_id, data, descricao });
  await writeDB(db);
  return id;
}

export async function getConsultationsByPatient(paciente_id) {
  const db = await readDB();
  return db.consultas.filter(c => c.paciente_id === paciente_id).sort((a,b)=> (b.data||"").localeCompare(a.data||""));
}

export async function getConsultationById(id) {
  const db = await readDB();
  return db.consultas.find(c => c.id === id);
}

export async function updateConsultation(id, { data, descricao }) {
  const db = await readDB();
  const idx = db.consultas.findIndex(c => c.id === id);
  if (idx >= 0) {
    db.consultas[idx] = { ...db.consultas[idx], data, descricao };
    await writeDB(db);
  }
}

export async function deleteConsultation(id) {
  const db = await readDB();
  db.consultas = db.consultas.filter(c => c.id !== id);
  await writeDB(db);
}
