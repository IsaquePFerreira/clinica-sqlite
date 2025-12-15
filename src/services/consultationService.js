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
  where,
  orderBy,
} from "firebase/firestore";

// CREATE
export async function createConsultation({ paciente_id, data, descricao }) {
  const ref = await addDoc(collection(db, "consultas"), {
    paciente_id,
    data,
    descricao,
  });
  return ref.id;
}

// READ BY PATIENT
export async function getConsultationsByPatient(paciente_id) {
  const q = query(
    collection(db, "consultas"),
    where("paciente_id", "==", paciente_id),
    orderBy("data", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// READ ONE
export async function getConsultationById(id) {
  const snap = await getDoc(doc(db, "consultas", id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// UPDATE
export async function updateConsultation(id, { data, descricao }) {
  await updateDoc(doc(db, "consultas", id), { data, descricao });
}

// DELETE
export async function deleteConsultation(id) {
  await deleteDoc(doc(db, "consultas", id));
}

