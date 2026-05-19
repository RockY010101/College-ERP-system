package com.collegeerp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * AcademicController — endpoints for courses, subjects, and results.
 * TODO (Phase 6): Full implementation.
 */
@RestController
@RequestMapping("/api")
public class AcademicController {

    @GetMapping("/courses")
    public ResponseEntity<?> getCourses() {
        return ResponseEntity.ok(Map.of("message", "GET /courses — Phase 6"));
    }

    @PostMapping("/courses")
    public ResponseEntity<?> createCourse(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("message", "POST /courses — Phase 6"));
    }

    @GetMapping("/subjects")
    public ResponseEntity<?> getSubjects() {
        return ResponseEntity.ok(Map.of("message", "GET /subjects — Phase 6"));
    }

    @PostMapping("/subjects")
    public ResponseEntity<?> createSubject(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("message", "POST /subjects — Phase 6"));
    }

    @PostMapping("/results")
    public ResponseEntity<?> submitResult(@RequestBody Map<String, Object> body) {
        return ResponseEntity.ok(Map.of("message", "POST /results — Phase 6"));
    }

    @GetMapping("/results/{studentId}")
    public ResponseEntity<?> getResults(@PathVariable Long studentId) {
        return ResponseEntity.ok(Map.of("message", "GET /results/" + studentId + " — Phase 6"));
    }
}
