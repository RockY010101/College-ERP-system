package com.collegeerp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * StudentController — CRUD endpoints for student management.
 * GET    /api/students
 * GET    /api/students/{id}
 * POST   /api/students
 * PUT    /api/students/{id}
 * DELETE /api/students/{id}
 *
 * TODO (Phase 4): Full implementation with StudentService.
 */
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(Map.of("message", "GET /students — Phase 4"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "GET /students/" + id + " — Phase 4"));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("message", "POST /students — Phase 4"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("message", "PUT /students/" + id + " — Phase 4"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "DELETE /students/" + id + " — Phase 4"));
    }
}
