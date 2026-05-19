package com.collegeerp.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Payment — payment transaction for a fee invoice.
 *
 * Table: payments
 */
@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentId;

    @ManyToOne
    @JoinColumn(name = "fee_id", nullable = false)
    private Fee fee;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "amount_paid", nullable = false, precision = 10, scale = 2)
    private BigDecimal amountPaid;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Enumerated(EnumType.STRING)
    private PaymentMethod method;

    @Column(name = "transaction_reference")
    private String transactionReference;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.PENDING;

    @Column(name = "approved_by")
    private Long approvedBy; // User ID of the approver

    public enum PaymentMethod {
        CASH, BANK_TRANSFER, ONLINE, CHEQUE
    }

    public enum Status {
        PENDING, APPROVED, REJECTED
    }
}
