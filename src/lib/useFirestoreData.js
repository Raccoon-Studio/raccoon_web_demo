/**
 * useFirestoreData — Bridge between Firestore CMS and local fallback data.
 *
 * Strategy:
 *  1. If Firebase is configured → fetch published docs from Firestore.
 *  2. If Firebase is NOT configured (no API key) → use local data files.
 *  3. If Firestore fetch fails → fall back to local data files.
 *
 * This ensures the public site always renders, with or without the CMS.
 */

import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../admin/lib/firebase";

/**
 * Fetch published documents from a Firestore collection.
 * @param {string} collectionName - Firestore collection name
 * @param {Array} fallbackData - Local static data to use as fallback
 * @param {object} options - { orderField, mapFn }
 * @returns {{ data: Array, loading: boolean, source: 'firestore' | 'local' }}
 */
export function useFirestoreData(collectionName, fallbackData = [], options = {}) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("local");

  useEffect(() => {
    if (!db) {
      // Firebase not configured — use local data immediately
      setData(fallbackData);
      setSource("local");
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchFromFirestore() {
      try {
        const constraints = [where("status", "==", "published")];

        if (options.orderField) {
          constraints.push(orderBy(options.orderField, options.orderDir || "asc"));
        } else {
          constraints.push(orderBy("updatedAt", "desc"));
        }

        const q = query(collection(db, collectionName), ...constraints);
        const snap = await getDocs(q);

        if (cancelled) return;

        if (snap.empty) {
          // No published docs yet — use local data
          setData(fallbackData);
          setSource("local");
        } else {
          const docs = snap.docs.map((d) => {
            const raw = { id: d.id, ...d.data() };
            return options.mapFn ? options.mapFn(raw) : raw;
          });
          setData(docs);
          setSource("firestore");
        }
      } catch (err) {
        console.warn(`[CMS] Firestore fetch failed for "${collectionName}", using local data:`, err.message);
        if (!cancelled) {
          setData(fallbackData);
          setSource("local");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFromFirestore();
    return () => { cancelled = true; };
  }, [collectionName]);

  return { data, loading, source };
}

/**
 * Fetch a single Firestore document by collection (for singleton configs like settings).
 * Falls back to a default object.
 */
export function useFirestoreSingleton(collectionName, docId, fallback = {}) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!db) {
      setData(fallback);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetch() {
      try {
        const { getDoc, doc } = await import("firebase/firestore");
        const snap = await getDoc(doc(db, collectionName, docId));
        if (!cancelled) {
          setData(snap.exists() ? { id: snap.id, ...snap.data() } : fallback);
        }
      } catch {
        if (!cancelled) setData(fallback);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, [collectionName, docId]);

  return { data, loading };
}
