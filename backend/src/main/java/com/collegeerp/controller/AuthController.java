package com.collegeerp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * AuthController — handles authentication endpoints.
 * POST /api/auth/login
 * POST /api/auth/logout
 * GET  /api/auth/validate
 * POST /api/auth/reset-password
 * GET  /api/health
 *
 * TODO (Phase 2): Full implementation with AuthService.
 */
@RestController
@RequestMapping("/api")
public class AuthController {

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "College ERP Backend"
        ));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        // TODO (Phase 2): Validate Firebase token, fetch role from DB, return user info
        return ResponseEntity.ok(Map.of("message", "Login endpoint — Phase 2"));
    }

    @PostMapping("/auth/logout")
    public ResponseEntity<?> logout() {
        // TODO (Phase 2): Revoke Firebase token / clear session
        return ResponseEntity.ok(Map.of("message", "Logout endpoint — Phase 2"));
    }

    @GetMapping("/auth/validate")
    public ResponseEntity<?> validate() {
        // TODO (Phase 2): Validate Firebase ID token and return user role
        return ResponseEntity.ok(Map.of("message", "Token validation — Phase 2"));
    }

    @PostMapping("/auth/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> body) {
        // TODO (Phase 2): Trigger Firebase password reset email
        return ResponseEntity.ok(Map.of("message", "Password reset — Phase 2"));
    }
}
