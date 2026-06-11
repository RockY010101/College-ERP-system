package com.collegeerp.service;

import com.collegeerp.model.Fee;
import com.collegeerp.model.Payment;
import com.collegeerp.repository.FeeRepository;
import com.collegeerp.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * FeeService — business logic for fees and payments.
 */
@Service
@RequiredArgsConstructor
public class FeeService {

    private final FeeRepository feeRepository;
    private final PaymentRepository paymentRepository;

    public List<Fee> findAllFees() {
        return feeRepository.findAll();
    }

    public List<Fee> findFeesByStudentId(Long studentId) {
        return feeRepository.findByStudent_StudentId(studentId);
    }

    public Fee createFee(Fee fee) {
        return feeRepository.save(fee);
    }

    public Fee updateFee(Long id, Fee updated) {
        Fee existing = feeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Fee not found with id: " + id));
        existing.setTotalAmount(updated.getTotalAmount());
        existing.setScholarshipAmount(updated.getScholarshipAmount());
        existing.setDueDate(updated.getDueDate());
        existing.setStatus(updated.getStatus());
        return feeRepository.save(existing);
    }

    public List<Payment> findPaymentsByStudentId(Long studentId) {
        return paymentRepository.findByStudent_StudentId(studentId);
    }

    public Payment createPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public List<Payment> findAllPayments() {
        return paymentRepository.findAll();
    }
}
