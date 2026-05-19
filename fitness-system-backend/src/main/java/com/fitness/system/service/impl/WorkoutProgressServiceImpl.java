package com.fitness.system.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;

import com.fitness.system.model.WorkoutProgress;
import com.fitness.system.repository.WorkoutProgressRepository;
import com.fitness.system.service.WorkoutProgressService;

@Service
public class WorkoutProgressServiceImpl implements WorkoutProgressService {

    private final WorkoutProgressRepository repository;

    public WorkoutProgressServiceImpl(WorkoutProgressRepository repository) {
        this.repository = repository;
    }

    @Override
    public WorkoutProgress saveWorkout(WorkoutProgress progress) {
        return repository.save(progress);
    }

    @Override
    public List<WorkoutProgress> getAllWorkouts() {
        return repository.findAll();
    }
}