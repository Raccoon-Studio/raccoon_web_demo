import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit,
  startAfter,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "./firebase";

// ── Collection names ──
export const COLLECTIONS = {
  projects: "projects",
  testimonials: "testimonials",
  services: "services",
  stats: "stats",
  techStack: "tech_stack",
  navigation: "navigation",
  hero: "hero_slides",
  settings: "settings",
  media: "media",
};

// ── Generic CRUD ──

export async function getDocuments(collName, filters = {}) {
  const constraints = [orderBy("updatedAt", "desc")];

  if (filters.status) {
    constraints.unshift(where("status", "==", filters.status));
  }
  if (filters.limit) {
    constraints.push(limit(filters.limit));
  }
  if (filters.startAfter) {
    constraints.push(startAfter(filters.startAfter));
  }

  const q = query(collection(db, collName), ...constraints);
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function getDocumentById(collName, docId) {
  const snap = await getDoc(doc(db, collName, docId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

export async function createDocument(collName, data) {
  const docRef = await addDoc(collection(db, collName), {
    ...data,
    status: data.status || "draft",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function updateDocument(collName, docId, data) {
  await updateDoc(doc(db, collName, docId), {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

export async function deleteDocument(collName, docId) {
  await deleteDoc(doc(db, collName, docId));
}

export async function publishDocument(collName, docId) {
  await updateDoc(doc(db, collName, docId), {
    status: "published",
    publishedAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function unpublishDocument(collName, docId) {
  await updateDoc(doc(db, collName, docId), {
    status: "draft",
    updatedAt: serverTimestamp(),
  });
}

// ── Counts for dashboard ──

export async function getCollectionCount(collName) {
  const snap = await getCountFromServer(collection(db, collName));
  return snap.data().count;
}

export async function getPublishedCount(collName) {
  const q = query(collection(db, collName), where("status", "==", "published"));
  const snap = await getCountFromServer(q);
  return snap.data().count;
}

export async function getDraftCount(collName) {
  const q = query(collection(db, collName), where("status", "==", "draft"));
  const snap = await getCountFromServer(q);
  return snap.data().count;
}
