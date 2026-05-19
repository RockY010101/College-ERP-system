package com.collegeerp.repository;

import com.collegeerp.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/** EmployeeRepository — data access for the employees table. */
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByDepartment_DepartmentId(Long departmentId);
}
