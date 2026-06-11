package com.collegeerp.service;

import com.collegeerp.model.Attendance;
import com.collegeerp.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * AttendanceService — business logic for attendance management.
 */
@Service
@RequiredArgsConstructor
public class AttendanceService {

    private final AttendanceRepository attendanceRepository;

    public List<Attendance> findAll() {
        return attendanceRepository.findAll();
    }

    public List<Attendance> findByStudentId(Long studentId) {
        return attendanceRepository.findByStudent_StudentId(studentId);
    }

    public Attendance mark(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> saveAll(List<Attendance> records) {
        return attendanceRepository.saveAll(records);
    }
}
