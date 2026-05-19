package com.fitness.system.service;

import java.util.List;
import com.fitness.system.model.WorkoutProgress;

public interface WorkoutProgressService {

    WorkoutProgress saveWorkout(WorkoutProgress progress);

    List<WorkoutProgress> getAllWorkouts();
}