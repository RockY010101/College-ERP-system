package com.collegeerp.repository;

import com.collegeerp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/** UserRepository — data access for the users table. */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByFirebaseUid(String firebaseUid);
    boolean existsByEmail(String email);
}
