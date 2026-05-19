package com.collegeerp.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Department — academic/administrative department.
 *
 * Table: departments
 */
@Entity
@Table(name = "departments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long departmentId;

    @Column(name = "department_name", nullable = false)
    private String departmentName;

    @Column(name = "department_code", unique = true, nullable = false)
    private String departmentCode;
}
