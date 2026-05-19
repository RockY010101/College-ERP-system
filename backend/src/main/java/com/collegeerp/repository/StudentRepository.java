package com.collegeerp.repository;

import com.collegeerp.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/** StudentRepository — data access for the students table. */
@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByUser_Id(Long userId);
    List<Student> findByCourse_CourseId(Long courseId);
    List<Student> findBySemester(Integer semester);
}
