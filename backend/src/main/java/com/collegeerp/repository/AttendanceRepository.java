package com.collegeerp.repository;

import com.collegeerp.model.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

/** AttendanceRepository — data access for the attendance table. */
@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudent_StudentId(Long studentId);
    List<Attendance> findByStudent_StudentIdAndSubject_SubjectId(Long studentId, Long subjectId);
    List<Attendance> findByDate(LocalDate date);
}
