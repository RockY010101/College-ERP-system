package com.collegeerp.security;

import org.springframework.stereotype.Component;

/**
 * RoleValidator — Utility to check user role permissions.
 * Used in service layer for fine-grained access control.
 *
 * TODO (Phase 2): Full implementation with DB role lookup.
 */
@Component
public class RoleValidator {

    public boolean isSuperAdmin(String role) {
        return "SUPER_ADMIN".equals(role);
    }

    public boolean isAdmin(String role) {
        return "ADMIN".equals(role) || isSuperAdmin(role);
    }

    public boolean isFaculty(String role) {
        return "FACULTY".equals(role);
    }

    public boolean isAccountant(String role) {
        return "ACCOUNTANT".equals(role);
    }

    public boolean isStudent(String role) {
        return "STUDENT".equals(role);
    }
}
