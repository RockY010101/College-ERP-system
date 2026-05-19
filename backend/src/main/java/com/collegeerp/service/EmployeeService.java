package com.collegeerp.service;

import com.collegeerp.model.Employee;
import com.collegeerp.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/** EmployeeService — TODO (Phase 5) */
@Service
@RequiredArgsConstructor
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
}
