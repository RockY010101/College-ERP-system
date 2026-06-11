package com.collegeerp.repository;

import com.collegeerp.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/** CourseRepository — data access for the courses table. */
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByStatus(Course.Status status);
}
