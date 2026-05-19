// ══════════════════════════════════════════════════════════════════════
// authService.js — College ERP Frontend
// Handles Firebase login/logout and backend token validation.
// ══════════════════════════════════════════════════════════════════════

import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'
import apiClient from './apiClient'

/**
 * Login with email and password via Firebase.
 * Returns the Firebase UserCredential.
 */
export const login = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

/**
 * Logout the current Firebase user.
 */
export const logout = async () => {
  return await signOut(auth)
}

/**
 * Send a password reset email via Firebase.
 */
export const resetPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email)
}

/**
 * Validate the Firebase ID token with the Spring Boot backend.
 * Returns the user's role from the database.
 */
export const validateToken = async () => {
  const response = await apiClient.get('/auth/validate')
  return response.data
}
