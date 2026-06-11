package com.collegeerp.repository;

import com.collegeerp.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/** PaymentRepository — data access for the payments table. */
@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByStudent_StudentId(Long studentId);
    List<Payment> findByStatus(Payment.Status status);
}
