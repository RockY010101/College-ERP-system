package com.collegeerp.security;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.stereotype.Component;

/**
 * TokenValidator — Helper to verify Firebase ID tokens.
 * Used by AuthService during login validation.
 *
 * TODO (Phase 2): Full implementation.
 */
@Component
public class TokenValidator {

    /**
     * Verify a Firebase ID token and return the decoded token.
     * @param idToken Firebase ID token from client.
     * @return Decoded FirebaseToken on success, null on failure.
     */
    public FirebaseToken verify(String idToken) {
        try {
            return FirebaseAuth.getInstance().verifyIdToken(idToken);
        } catch (Exception e) {
            return null;
        }
    }
}
