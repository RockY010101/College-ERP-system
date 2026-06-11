package com.collegeerp.service;

import com.collegeerp.model.Employee;
import com.collegeerp.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * EmployeeService — business logic for employee (faculty/staff) management.
 */
@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public List<Employee> findAll() {
        return employeeRepository.findAll();
    }

    public Employee findById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
    }

    public Employee create(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee update(Long id, Employee updated) {
        Employee existing = findById(id);
        existing.setDesignation(updated.getDesignation());
        existing.setSalary(updated.getSalary());
        existing.setStatus(updated.getStatus());
        return employeeRepository.save(existing);
    }

    public void delete(Long id) {
        employeeRepository.deleteById(id);
    }

    public long countAll() {
        return employeeRepository.count();
    }
}
