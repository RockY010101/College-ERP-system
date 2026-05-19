package com.collegeerp.repository;

import com.collegeerp.model.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/** FeeRepository — data access for the fees table. */
@Repository
public interface FeeRepository extends JpaRepository<Fee, Long> {
    List<Fee> findByStudent_StudentId(Long studentId);
    List<Fee> findByStatus(Fee.Status status);
}
