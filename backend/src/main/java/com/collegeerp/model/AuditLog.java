package com.collegeerp.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * AuditLog — records all significant user actions for compliance.
 *
 * Table: audit_logs
 */
@Entity
@Table(name = "audit_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long auditId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String action; // e.g. "CREATE_STUDENT", "DELETE_USER"

    @Column(name = "target_entity")
    private String targetEntity; // e.g. "Student"

    @Column(name = "target_id")
    private Long targetId;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "ip_address")
    private String ipAddress;
}
