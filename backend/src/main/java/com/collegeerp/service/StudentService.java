package com.collegeerp.service;

import com.collegeerp.model.Student;
import com.collegeerp.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * StudentService — business logic for student management.
 */
@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    public Student findById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }

    public Student create(Student student) {
        return studentRepository.save(student);
    }

    public Student update(Long id, Student updated) {
        Student existing = findById(id);
        existing.setSemester(updated.getSemester());
        existing.setCgpa(updated.getCgpa());
        existing.setAddress(updated.getAddress());
        existing.setStatus(updated.getStatus());
        return studentRepository.save(existing);
    }

    public void delete(Long id) {
        studentRepository.deleteById(id);
    }

    public long countAll() {
        return studentRepository.count();
    }
}
