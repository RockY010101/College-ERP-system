package com.collegeerp.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

/**
 * User — represents a system user (Admin, Faculty, Accountant, Student).
 * Linked to Firebase via firebase_uid.
 *
 * Table: users
 */
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    private String phone;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(name = "firebase_uid", unique = true)
    private String firebaseUid;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ── Enums ─────────────────────────────────────────────────────────

    public enum Role {
        SUPER_ADMIN, ADMIN, FACULTY, ACCOUNTANT, STUDENT
    }

    public enum Status {
        ACTIVE, INACTIVE, SUSPENDED
    }
}
