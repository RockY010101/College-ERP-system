package com.collegeerp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * EmployeeController — CRUD endpoints for employee management.
 * TODO (Phase 5): Full implementation.
 */
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(Map.of("message", "GET /employees — Phase 5"));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("message", "POST /employees — Phase 5"));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("message", "PUT /employees/" + id + " — Phase 5"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "DELETE /employees/" + id + " — Phase 5"));
    }
}
