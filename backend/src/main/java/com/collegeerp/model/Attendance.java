package com.collegeerp.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

/**
 * Attendance — daily attendance record per student per subject.
 *
 * Table: attendance
 */
@Entity
@Table(name = "attendance")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attendanceId;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "subject_id", nullable = false)
    private Subject subject;

    @ManyToOne
    @JoinColumn(name = "faculty_id", nullable = false)
    private Employee faculty;

    @Column(nullable = false)
    private LocalDate date;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    private String remarks;

    public enum Status {
        PRESENT, ABSENT, LATE
    }
}
