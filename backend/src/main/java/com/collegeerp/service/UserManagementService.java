package com.collegeerp.service;

import com.collegeerp.dto.CreateUserRequest;
import com.collegeerp.dto.UserResponse;
import com.collegeerp.model.User;
import com.collegeerp.repository.UserRepository;
import com.google.firebase.FirebaseApp;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * UserManagementService — handles Super Admin user creation.
 *
 * Flow:
 *  1. Create user in Firebase Auth (email + password) using Admin SDK
 *  2. Save user record in PostgreSQL users table with Firebase UID
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserManagementService {

    private final UserRepository userRepository;

    // ── Create User ─────────────────────────────────────────────────────

    public UserResponse createUser(CreateUserRequest req) {
        // Validate email uniqueness in DB first
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("A user with email " + req.getEmail() + " already exists.");
        }

        String firebaseUid = null;

        // Step 1: Create Firebase Auth user (only if Firebase is initialised)
        if (!FirebaseApp.getApps().isEmpty()) {
            try {
                UserRecord.CreateRequest createRequest = new UserRecord.CreateRequest()
                        .setEmail(req.getEmail())
                        .setPassword(req.getPassword())
                        .setDisplayName(req.getFirstName() + " " + req.getLastName())
                        .setEmailVerified(false)
                        .setDisabled(false);

                UserRecord firebaseUser = FirebaseAuth.getInstance().createUser(createRequest);
                firebaseUid = firebaseUser.getUid();
                log.info("✅ Firebase user created: uid={} email={}", firebaseUid, req.getEmail());

            } catch (Exception e) {
                log.error("❌ Firebase user creation failed: {}", e.getMessage());
                throw new RuntimeException("Failed to create Firebase user: " + e.getMessage());
            }
        } else {
            log.warn("⚠️ Firebase not initialised. Saving user to DB only (no Firebase account created).");
        }

        // Step 2: Map role string → enum
        User.Role role;
        try {
            role = User.Role.valueOf(req.getRole().toUpperCase().replace(" ", "_"));
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid role: " + req.getRole() +
                ". Valid roles: SUPER_ADMIN, ADMIN, FACULTY, ACCOUNTANT, STUDENT");
        }

        // Step 3: Persist in PostgreSQL
        User user = User.builder()
                .name(req.getFirstName() + " " + req.getLastName())
                .email(req.getEmail())
                .phone(req.getPhone())
                .role(role)
                .firebaseUid(firebaseUid)
                .status(User.Status.ACTIVE)
                .build();

        User saved = userRepository.save(user);
        log.info("✅ User saved to DB: id={} email={}", saved.getId(), saved.getEmail());

        return toResponse(saved, req.getDepartment());
    }

    // ── List All Users ────────────────────────────────────────────────────

    public List<UserResponse> listAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(u -> toResponse(u, null))
                .collect(Collectors.toList());
    }

    // ── Update User Status ────────────────────────────────────────────────

    public UserResponse updateUserStatus(Long userId, String status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        User.Status newStatus = User.Status.valueOf(status.toUpperCase());
        user.setStatus(newStatus);

        // If Firebase is up, also disable/enable Firebase account
        if (!FirebaseApp.getApps().isEmpty() && user.getFirebaseUid() != null) {
            try {
                boolean disabled = newStatus != User.Status.ACTIVE;
                UserRecord.UpdateRequest updateRequest = new UserRecord.UpdateRequest(user.getFirebaseUid())
                        .setDisabled(disabled);
                FirebaseAuth.getInstance().updateUser(updateRequest);
            } catch (Exception e) {
                log.warn("⚠️ Could not update Firebase user status: {}", e.getMessage());
            }
        }

        User updated = userRepository.save(user);
        return toResponse(updated, null);
    }

    // ── Delete User ────────────────────────────────────────────────────────

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));

        // Delete from Firebase Auth if Firebase is initialised
        if (!FirebaseApp.getApps().isEmpty() && user.getFirebaseUid() != null) {
            try {
                FirebaseAuth.getInstance().deleteUser(user.getFirebaseUid());
                log.info("✅ Firebase user deleted: uid={}", user.getFirebaseUid());
            } catch (Exception e) {
                log.warn("⚠️ Could not delete Firebase user: {}", e.getMessage());
            }
        }

        userRepository.deleteById(userId);
        log.info("✅ User deleted from DB: id={}", userId);
    }

    // ── Helpers ────────────────────────────────────────────────────────────

    private UserResponse toResponse(User user, String department) {
        return UserResponse.builder()
                .id(user.getId())
                .firebaseUid(user.getFirebaseUid())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole() != null ? user.getRole().name() : null)
                .department(department)
                .phone(user.getPhone())
                .status(user.getStatus() != null ? user.getStatus().name() : "ACTIVE")
                .createdAt(user.getCreatedAt() != null ? user.getCreatedAt().toString() : null)
                .build();
    }
}
