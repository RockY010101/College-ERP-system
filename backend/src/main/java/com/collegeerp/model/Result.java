package com.collegeerp.model;

import jakarta.persistence.*;
import lombok.*;

/**
 * Result — academic result for a student in a subject.
 *
 * Table: results
 */
@Entity
@Table(name = "results")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    private Double marks;

    private String grade;

    private Integer semester;

    @Enumerated(EnumType.STRING)
    private ExamType examType;

    private String remarks;

    public enum ExamType {
        INTERNAL, EXTERNAL, PRACTICAL
    }
}
