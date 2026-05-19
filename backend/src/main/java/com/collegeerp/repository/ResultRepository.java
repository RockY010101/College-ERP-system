package com.collegeerp.repository;

import com.collegeerp.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/** ResultRepository — data access for the results table. */
@Repository
public interface ResultRepository extends JpaRepository<Result, Long> {
    List<Result> findByStudent_StudentId(Long studentId);
    List<Result> findByStudent_StudentIdAndSemester(Long studentId, Integer semester);
}
