package com.collegeerp.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Course — academic program offered by a department.
 *
 * Table: courses
 */
@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    @Column(name = "course_name", nullable = false)
    private String courseName;

    @Column(name = "course_code", unique = true, nullable = false)
    private String courseCode;

    private Integer duration; // in semesters

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    public enum Status {
        ACTIVE, INACTIVE
    }
}
