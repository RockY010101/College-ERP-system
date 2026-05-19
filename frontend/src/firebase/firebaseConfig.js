// ══════════════════════════════════════════════════════════════════════
// Firebase Configuration — College ERP Frontend
// ══════════════════════════════════════════════════════════════════════
// All values are loaded from environment variables.
// Copy frontend/.env.example to frontend/.env and fill in your values.
// ══════════════════════════════════════════════════════════════════════

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase app
const app = initializeApp(firebaseConfig)

// Export Firebase Auth instance (used by authService.js)
export const auth = getAuth(app)

export default app
