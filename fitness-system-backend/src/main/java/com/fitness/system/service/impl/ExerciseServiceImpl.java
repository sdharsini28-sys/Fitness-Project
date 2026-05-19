package com.fitness.system.service.impl;

import java.util.List;
import java.util.Random;

import org.springframework.stereotype.Service;
import com.fitness.system.model.Exercise;
import com.fitness.system.repository.ExerciseRepository;
import com.fitness.system.service.ExerciseService;

@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final Random random = new Random();

    public ExerciseServiceImpl(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @Override
    public List<Exercise> getAllExercises() {
        return exerciseRepository.findAll();
    }

    @Override
    public Exercise getRandomExercise(String purpose) {
        List<Exercise> exercises = exerciseRepository.findByPurpose(purpose);
        if (exercises.isEmpty()) return null;
        return exercises.get(random.nextInt(exercises.size()));
    }
}
