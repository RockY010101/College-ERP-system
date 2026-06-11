package com.collegeerp.dto;

import lombok.Data;

/**
 * CreateUserRequest — DTO for creating a new user via Super Admin.
 * Received at POST /api/users
 */
@Data
public class CreateUserRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;        // Used to create Firebase Auth account
    private String role;            // ADMIN | FACULTY | ACCOUNTANT | STUDENT | SUPER_ADMIN
    private String department;
    private String phone;
}
