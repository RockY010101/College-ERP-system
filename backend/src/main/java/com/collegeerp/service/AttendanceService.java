package com.collegeerp.service;

import com.collegeerp.repository.AttendanceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/** AttendanceService — TODO (Phase 7) */
@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
}
