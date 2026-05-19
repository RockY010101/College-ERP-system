package com.collegeerp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * AttendanceController — endpoints for attendance management.
 * TODO (Phase 7): Full implementation.
 */
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @GetMapping
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(Map.of("message", "GET /attendance — Phase 7"));
    }

    @PostMapping
    public ResponseEntity<?> mark(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("message", "POST /attendance — Phase 7"));
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<?> getByStudent(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "GET /attendance/student/" + id + " — Phase 7"));
    }
}
