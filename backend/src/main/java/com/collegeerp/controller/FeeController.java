package com.collegeerp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * FeeController — endpoints for fee and payment management.
 * TODO (Phase 8): Full implementation.
 */
@RestController
@RequestMapping("/api")
public class FeeController {

    @GetMapping("/fees")
    public ResponseEntity<?> getFees() {
        return ResponseEntity.ok(Map.of("message", "GET /fees — Phase 8"));
    }

    @PostMapping("/fees")
    public ResponseEntity<?> createFee(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("message", "POST /fees — Phase 8"));
    }

    @PutMapping("/fees/{id}")
    public ResponseEntity<?> updateFee(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("message", "PUT /fees/" + id + " — Phase 8"));
    }

    @PostMapping("/payments")
    public ResponseEntity<?> createPayment(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("message", "POST /payments — Phase 8"));
    }

    @GetMapping("/payments/{studentId}")
    public ResponseEntity<?> getPayments(@PathVariable Long studentId) {
        return ResponseEntity.ok(Map.of("message", "GET /payments/" + studentId + " — Phase 8"));
    }
}
