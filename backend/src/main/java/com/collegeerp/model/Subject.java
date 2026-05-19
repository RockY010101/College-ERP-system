package com.collegeerp.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Subject — a unit of study within a course semester.
 *
 * Table: subjects
 */
@Entity
@Table(name = "subjects")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Subject {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subjectId;

    @Column(name = "subject_name", nullable = false)
    private String subjectName;

    @Column(name = "subject_code", unique = true, nullable = false)
    private String subjectCode;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private Integer semester;

    private Integer credits;

    @ManyToOne
    @JoinColumn(name = "faculty_id")
    private Employee faculty;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    public enum Status {
        ACTIVE, INACTIVE
    }
}
