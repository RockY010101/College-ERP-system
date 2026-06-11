package com.collegeerp.controller;

import com.collegeerp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * ReportController — summary reporting endpoints per role.
 * GET /api/reports/admin
 * GET /api/reports/finance
 * GET /api/reports/faculty
 * GET /api/reports/student
 */
@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final StudentRepository studentRepository;
    private final EmployeeRepository employeeRepository;
    private final FeeRepository feeRepository;
    private final ResultRepository resultRepository;
    private final AttendanceRepository attendanceRepository;
    private final PaymentRepository paymentRepository;

    @GetMapping("/admin")
    public ResponseEntity<Map<String, Object>> adminReport() {
        Map<String, Object> report = new HashMap<>();
        report.put("totalStudents", studentRepository.count());
        report.put("totalFaculty", employeeRepository.count());
        report.put("totalFeeRecords", feeRepository.count());
        report.put("totalPayments", paymentRepository.count());
        return ResponseEntity.ok(report);
    }

    @GetMapping("/finance")
    public ResponseEntity<Map<String, Object>> financeReport() {
        Map<String, Object> report = new HashMap<>();
        report.put("totalFeeRecords", feeRepository.count());
        report.put("paidFees", feeRepository.findByStatus(com.collegeerp.model.Fee.Status.PAID).size());
        report.put("unpaidFees", feeRepository.findByStatus(com.collegeerp.model.Fee.Status.UNPAID).size());
        report.put("overdueFees", feeRepository.findByStatus(com.collegeerp.model.Fee.Status.OVERDUE).size());
        report.put("totalPayments", paymentRepository.count());
        report.put("defaulters", feeRepository.findByStatus(com.collegeerp.model.Fee.Status.OVERDUE));
        return ResponseEntity.ok(report);
    }

    @GetMapping("/faculty")
    public ResponseEntity<Map<String, Object>> facultyReport() {
        Map<String, Object> report = new HashMap<>();
        report.put("totalStudents", studentRepository.count());
        report.put("totalAttendanceRecords", attendanceRepository.count());
        report.put("totalResults", resultRepository.count());
        return ResponseEntity.ok(report);
    }

    @GetMapping("/student")
    public ResponseEntity<Map<String, Object>> studentReport() {
        Map<String, Object> report = new HashMap<>();
        report.put("totalStudents", studentRepository.count());
        return ResponseEntity.ok(report);
    }
}
