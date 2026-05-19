package com.collegeerp.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Employee — represents a faculty member, accountant, or admin employee.
 *
 * Table: employees
 */
@Entity
@Table(name = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    private String designation;

    @Column(precision = 10, scale = 2)
    private BigDecimal salary;

    @Column(name = "join_date")
    private LocalDate joinDate;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    @Column(name = "profile_image")
    private String profileImage;

    public enum Status {
        ACTIVE, INACTIVE, TERMINATED
    }
}
