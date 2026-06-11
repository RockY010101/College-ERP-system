package com.collegeerp.controller;

import com.collegeerp.model.Attendance;
import com.collegeerp.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * AttendanceController — endpoints for attendance management.
 * GET    /api/attendance
 * GET    /api/attendance/student/{id}
 * POST   /api/attendance
 */
@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @GetMapping
    public ResponseEntity<List<Attendance>> getAll() {
        return ResponseEntity.ok(attendanceService.findAll());
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<List<Attendance>> getByStudent(@PathVariable Long id) {
        return ResponseEntity.ok(attendanceService.findByStudentId(id));
    }

    @PostMapping
    public ResponseEntity<Attendance> mark(@RequestBody Attendance attendance) {
        return ResponseEntity.ok(attendanceService.mark(attendance));
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Attendance>> markBulk(@RequestBody List<Attendance> records) {
        return ResponseEntity.ok(attendanceService.saveAll(records));
    }
}
