package com.fitness.system.service;

import java.util.List;
import com.fitness.system.model.Exercise;

public interface ExerciseService {
    List<Exercise> getAllExercises();
    Exercise getRandomExercise(String purpose);
}