package com.collegeerp.dto;

import lombok.Builder;
import lombok.Data;

/**
 * UserResponse — DTO returned for user list and creation confirmation.
 */
@Data
@Builder
public class UserResponse {
    private Long id;
    private String firebaseUid;
    private String name;
    private String email;
    private String role;
    private String department;
    private String phone;
    private String status;
    private String createdAt;
}
