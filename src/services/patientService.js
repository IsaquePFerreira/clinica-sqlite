import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  where,
} from "firebase/firestore";

// CREATE
export async function createPatient({ nome, telefone, idade }) {
  const ref = await addDoc(collection(db, "pacientes"), {
    nome,
    telefone,
    idade: idade ?? null,
  });
  return ref.id;
}

// READ ALL
export async function getAllPatients() {
  const q = query(collection(db, "pacientes"), orderBy("nome"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// READ ONE
export async function getPatientById(id) {
  const snap = await getDoc(doc(db, "pacientes", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// UPDATE
export async function updatePatient(id, { nome, telefone, idade }) {
  await updateDoc(doc(db, "pacientes", id), {
    nome,
    telefone,
    idade: idade ?? null,
  });
}

// DELETE (and cascade consultations)
export async function deletePatient(id) {
  // delete patient
  await deleteDoc(doc(db, "pacientes", id));

  // delete consultations
  const q = query(
    collection(db, "consultas"),
    where("paciente_id", "==", id)
  );
  const snap = await getDocs(q);
  await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));
}

