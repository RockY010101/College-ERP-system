package com.collegeerp.service;

import com.collegeerp.model.User;
import com.collegeerp.repository.UserRepository;
import com.collegeerp.security.TokenValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * AuthService — handles authentication business logic.
 * Verifies Firebase tokens and fetches user roles from database.
 *
 * TODO (Phase 2): Full implementation.
 */
@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final TokenValidator tokenValidator;

    /**
     * Validate a Firebase ID token and return the corresponding User.
     * @param idToken Firebase ID token from client.
     * @return User entity with role.
     */
    public User validateAndGetUser(String idToken) {
        // TODO (Phase 2): Implement
        throw new UnsupportedOperationException("Phase 2: Not yet implemented");
    }
}
