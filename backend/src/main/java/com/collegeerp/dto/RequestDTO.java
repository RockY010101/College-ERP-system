package com.collegeerp.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

/**
 * Request DTOs — data transfer objects for incoming API requests.
 * Each nested class maps to a specific API operation.
 *
 * TODO (Phase 2+): Expand per module as modules are implemented.
 */
public class RequestDTO {

    // ── Auth ──────────────────────────────────────────────────────────

    @Data
    public static class LoginRequest {
        @NotBlank(message = "ID token is required")
        private String idToken;
    }

    @Data
    public static class ResetPasswordRequest {
        @Email(message = "Valid email required")
        @NotBlank(message = "Email is required")
        private String email;
    }

    // ── Student ───────────────────────────────────────────────────────

    @Data
    public static class CreateStudentRequest {
        @NotBlank private String name;
        @Email private String email;
        private String phone;
        private Long courseId;
        private Integer semester;
    }

    // ── Employee ──────────────────────────────────────────────────────

    @Data
    public static class CreateEmployeeRequest {
        @NotBlank private String name;
        @Email private String email;
        private String phone;
        private Long departmentId;
        private String designation;
    }

    // ── Attendance ────────────────────────────────────────────────────

    @Data
    public static class MarkAttendanceRequest {
        private Long studentId;
        private Long subjectId;
        private String date;    // ISO date: yyyy-MM-dd
        private String status;  // PRESENT | ABSENT | LATE
        private String remarks;
    }

    // ── Fee ───────────────────────────────────────────────────────────

    @Data
    public static class CreateFeeRequest {
        private Long studentId;
        private Integer semester;
        private Double totalAmount;
        private Double scholarshipAmount;
        private String dueDate;
    }
}
