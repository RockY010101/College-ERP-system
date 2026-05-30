// ══════════════════════════════════════════════════════════════════════
// firestoreService.js — College ERP Frontend
// Queries Firestore for user role data.
// Collection: users/{firebase_uid}
// Document fields: { role, name, email, department?, status? }
// ══════════════════════════════════════════════════════════════════════

import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

/**
 * Fetch the user's role from Firestore.
 *
 * Expects a document at `users/{uid}` with at least a `role` field.
 * Valid roles: SUPER_ADMIN | ADMIN | FACULTY | ACCOUNTANT | STUDENT
 *
 * @param {string} uid - Firebase Auth UID
 * @returns {Promise<{role: string, name: string, email: string} | null>}
 *          User data object if found, null if no document exists.
 */
export const getUserByUid = async (uid) => {
  try {
    console.log('[DEBUG] Fetching Firestore doc: users/' + uid)
    const userDocRef = doc(db, 'users', uid)
    const userSnap = await getDoc(userDocRef)

    if (userSnap.exists()) {
      const data = userSnap.data()
      console.log('[DEBUG] Firestore doc found:', data)
      return data
    }

    // No document — user exists in Firebase Auth but has no role assigned
    console.warn('[DEBUG] No Firestore doc found for UID:', uid)
    return null
  } catch (error) {
    console.error('[DEBUG] Firestore ERROR:', error.code, error.message)
    return null
  }
}

/**
 * Convenience function — returns just the role string or null.
 *
 * @param {string} uid - Firebase Auth UID
 * @returns {Promise<string | null>} Role string (e.g. "FACULTY") or null.
 */
export const getUserRole = async (uid) => {
  const userData = await getUserByUid(uid)
  return userData?.role || null
}
