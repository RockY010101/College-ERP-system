package com.collegeerp.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Fee — semester fee record for a student.
 *
 * Table: fees
 */
@Entity
@Table(name = "fees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feeId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    private Integer semester;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(name = "scholarship_amount", precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal scholarshipAmount = BigDecimal.ZERO;

    @Column(name = "penalty_amount", precision = 10, scale = 2)
    @Builder.Default
    private BigDecimal penaltyAmount = BigDecimal.ZERO;

    @Column(name = "due_date")
    private LocalDate dueDate;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.UNPAID;

    public enum Status {
        PAID, UNPAID, PARTIAL, OVERDUE
    }
}
