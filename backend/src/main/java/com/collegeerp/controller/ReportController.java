package com.collegeerp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

/**
 * ReportController — reporting endpoints per role.
 * TODO (Phase 10): Full implementation.
 */
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    @GetMapping("/admin")
    public ResponseEntity<?> adminReport() {
        return ResponseEntity.ok(Map.of("message", "GET /reports/admin — Phase 10"));
    }

    @GetMapping("/finance")
    public ResponseEntity<?> financeReport() {
        return ResponseEntity.ok(Map.of("message", "GET /reports/finance — Phase 10"));
    }

    @GetMapping("/faculty")
    public ResponseEntity<?> facultyReport() {
        return ResponseEntity.ok(Map.of("message", "GET /reports/faculty — Phase 10"));
    }

    @GetMapping("/student")
    public ResponseEntity<?> studentReport() {
        return ResponseEntity.ok(Map.of("message", "GET /reports/student — Phase 10"));
    }
}
