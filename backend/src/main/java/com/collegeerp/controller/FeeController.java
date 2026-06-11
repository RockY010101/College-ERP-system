package com.collegeerp.controller;

import com.collegeerp.model.Fee;
import com.collegeerp.model.Payment;
import com.collegeerp.service.FeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * FeeController — endpoints for fee structure and payment management.
 * GET  /api/fees
 * POST /api/fees
 * PUT  /api/fees/{id}
 * GET  /api/payments
 * GET  /api/payments/{studentId}
 * POST /api/payments
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FeeController {

    private final FeeService feeService;

    /* ── Fees ── */

    @GetMapping("/fees")
    public ResponseEntity<List<Fee>> getFees() {
        return ResponseEntity.ok(feeService.findAllFees());
    }

    @GetMapping("/fees/student/{studentId}")
    public ResponseEntity<List<Fee>> getFeesByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(feeService.findFeesByStudentId(studentId));
    }

    @PostMapping("/fees")
    public ResponseEntity<Fee> createFee(@RequestBody Fee fee) {
        return ResponseEntity.ok(feeService.createFee(fee));
    }

    @PutMapping("/fees/{id}")
    public ResponseEntity<Fee> updateFee(@PathVariable Long id, @RequestBody Fee fee) {
        return ResponseEntity.ok(feeService.updateFee(id, fee));
    }

    /* ── Payments ── */

    @GetMapping("/payments")
    public ResponseEntity<List<Payment>> getAllPayments() {
        return ResponseEntity.ok(feeService.findAllPayments());
    }

    @GetMapping("/payments/{studentId}")
    public ResponseEntity<List<Payment>> getPaymentsByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(feeService.findPaymentsByStudentId(studentId));
    }

    @PostMapping("/payments")
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        return ResponseEntity.ok(feeService.createPayment(payment));
    }
}
