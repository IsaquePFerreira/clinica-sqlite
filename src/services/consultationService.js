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
  Timestamp,
} from "firebase/firestore";

const COLLECTION = "consultas";

/* =======================
   CREATE
======================= */
export async function createConsultation({
  paciente_id,
  data,
  descricao,
}) {
  if (!paciente_id) throw new Error("paciente_id is required");

  const parsedDate =
    data instanceof Date ? data : new Date(data);

  const ref = await addDoc(collection(db, COLLECTION), {
    paciente_id,
    data: Timestamp.fromDate(parsedDate),
    descricao: descricao || "",
    createdAt: Timestamp.now(),
  });

  return ref.id;
}

/* =======================
   READ BY PATIENT
======================= */
export async function getConsultationsByPatient(paciente_id) {
  if (!paciente_id) return [];

  try {
    const q = query(
      collection(db, COLLECTION),
      where("paciente_id", "==", paciente_id),
      orderBy("data", "desc")
    );

    const snap = await getDocs(q);

    return snap.docs.map(d => ({
      id: d.id,
      ...d.data(),
    }));
  } catch (error) {
    console.error("getConsultationsByPatient error:", error);
    return [];
  }
}

/* =======================
   READ ONE
======================= */
export async function getConsultationById(id) {
  if (!id) return null;

  const snap = await getDoc(doc(db, COLLECTION, id));

  return snap.exists()
    ? { id: snap.id, ...snap.data() }
    : null;
}

/* =======================
   UPDATE
======================= */
export async function updateConsultation(id, { data, descricao }) {
  if (!id) throw new Error("Consultation ID required");

  const updateData = {
    descricao,
  };

  if (data) {
    const parsedDate =
      data instanceof Date ? data : new Date(data);
    updateData.data = Timestamp.fromDate(parsedDate);
  }

  await updateDoc(doc(db, COLLECTION, id), updateData);
}

/* =======================
   DELETE
======================= */
export async function deleteConsultation(id) {
  if (!id) throw new Error("Consultation ID required");

  await deleteDoc(doc(db, COLLECTION, id));
}
