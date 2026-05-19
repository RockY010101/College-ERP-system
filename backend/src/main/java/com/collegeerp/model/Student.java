package com.collegeerp.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

/**
 * Student — represents an enrolled student.
 * Linked to User (one-to-one) and Course.
 *
 * Table: students
 */
@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;

    private Integer semester;

    private Double cgpa;

    @Column(name = "dob")
    private LocalDate dateOfBirth;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "admission_date")
    private LocalDate admissionDate;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    @Column(name = "profile_image")
    private String profileImage;

    public enum Gender {
        MALE, FEMALE, OTHER
    }

    public enum Status {
        ACTIVE, INACTIVE, GRADUATED, DROPPED
    }
}
