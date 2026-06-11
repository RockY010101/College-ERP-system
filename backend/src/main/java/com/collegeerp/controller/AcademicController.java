package com.collegeerp.controller;

import com.collegeerp.model.Course;
import com.collegeerp.model.Result;
import com.collegeerp.repository.CourseRepository;
import com.collegeerp.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * AcademicController — endpoints for courses, subjects, and results.
 * GET  /api/courses
 * POST /api/courses
 * GET  /api/results/{studentId}
 * POST /api/results
 */
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class AcademicController {

    private final CourseRepository courseRepository;
    private final ResultRepository resultRepository;

    /* ── Courses ── */

    @GetMapping("/courses")
    public ResponseEntity<List<Course>> getCourses() {
        return ResponseEntity.ok(courseRepository.findAll());
    }

    @PostMapping("/courses")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return ResponseEntity.ok(courseRepository.save(course));
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course updated) {
        Course existing = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found: " + id));
        existing.setCourseName(updated.getCourseName());
        existing.setCourseCode(updated.getCourseCode());
        existing.setDuration(updated.getDuration());
        existing.setStatus(updated.getStatus());
        return ResponseEntity.ok(courseRepository.save(existing));
    }

    @DeleteMapping("/courses/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /* ── Results ── */

    @GetMapping("/results/{studentId}")
    public ResponseEntity<List<Result>> getResults(@PathVariable Long studentId) {
        return ResponseEntity.ok(resultRepository.findByStudent_StudentId(studentId));
    }

    @PostMapping("/results")
    public ResponseEntity<Result> submitResult(@RequestBody Result result) {
        return ResponseEntity.ok(resultRepository.save(result));
    }
}
