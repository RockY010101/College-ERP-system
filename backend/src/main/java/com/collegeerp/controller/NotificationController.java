package com.collegeerp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * NotificationController — endpoints for notifications.
 * TODO (Phase 9): Full implementation.
 */
@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(Map.of("message", "GET /notifications — Phase 9"));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("message", "POST /notifications — Phase 9"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> markRead(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "PUT /notifications/" + id + " — Phase 9"));
    }
}
