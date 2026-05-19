package com.collegeerp.service;

import com.collegeerp.repository.FeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/** FeeService — TODO (Phase 8) */
@Service
@RequiredArgsConstructor
public class FeeService {
    private final FeeRepository feeRepository;
}
