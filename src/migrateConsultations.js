import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

// 🔹 Your Firebase config (same as your app)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "react-native-clinica",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
  const snap = await getDocs(collection(db, "consultas"));

  console.log(`Found ${snap.size} documents`);

  for (const doc of snap.docs) {
    const data = doc.data().data;

    // Only migrate string dates
    if (typeof data === "string") {
      const parsed = new Date(data);

      if (isNaN(parsed.getTime())) {
        console.log(`⚠️ Invalid date in doc ${doc.id}:`, data);
        continue;
      }

      await updateDoc(doc.ref, {
        data: Timestamp.fromDate(parsed),
      });

      console.log(`✅ Migrated doc ${doc.id}`);
    }
  }

  console.log("🎉 Migration completed");
}

migrate().catch(console.error);
