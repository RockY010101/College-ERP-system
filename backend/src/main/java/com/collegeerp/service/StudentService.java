package com.collegeerp.service;

import com.collegeerp.model.Student;
import com.collegeerp.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * StudentService — business logic for student management.
 * TODO (Phase 4): Full implementation.
 */
@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> findAll() {
        throw new UnsupportedOperationException("Phase 4: Not yet implemented");
    }

    public Student findById(Long id) {
        throw new UnsupportedOperationException("Phase 4: Not yet implemented");
    }

    public Student create(Student student) {
        throw new UnsupportedOperationException("Phase 4: Not yet implemented");
    }

    public Student update(Long id, Student student) {
        throw new UnsupportedOperationException("Phase 4: Not yet implemented");
    }

    public void delete(Long id) {
        throw new UnsupportedOperationException("Phase 4: Not yet implemented");
    }
}
