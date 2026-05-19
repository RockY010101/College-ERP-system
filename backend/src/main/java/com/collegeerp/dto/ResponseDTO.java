package com.collegeerp.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

/**
 * Response DTOs — structured API response objects.
 * Each nested class maps to a specific API response.
 *
 * TODO (Phase 2+): Expand per module as modules are implemented.
 */
public class ResponseDTO {

    // ── Auth ──────────────────────────────────────────────────────────

    @Data
    @Builder
    public static class AuthResponse {
        private Long userId;
        private String name;
        private String email;
        private String role;
        private String firebaseUid;
    }

    // ── Student ───────────────────────────────────────────────────────

    @Data
    @Builder
    public static class StudentResponse {
        private Long studentId;
        private String name;
        private String email;
        private String courseName;
        private Integer semester;
        private Double cgpa;
        private String status;
    }

    // ── Employee ──────────────────────────────────────────────────────

    @Data
    @Builder
    public static class EmployeeResponse {
        private Long employeeId;
        private String name;
        private String email;
        private String department;
        private String designation;
        private String status;
    }

    // ── Generic API Response Wrapper ──────────────────────────────────

    @Data
    @Builder
    public static class ApiResponse<T> {
        private boolean success;
        private String message;
        private T data;
        private LocalDateTime timestamp;
    }
}
