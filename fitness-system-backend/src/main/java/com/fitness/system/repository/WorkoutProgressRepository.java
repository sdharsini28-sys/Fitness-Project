package com.fitness.system.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.fitness.system.model.WorkoutProgress;

public interface WorkoutProgressRepository extends JpaRepository<WorkoutProgress, Long> {
}