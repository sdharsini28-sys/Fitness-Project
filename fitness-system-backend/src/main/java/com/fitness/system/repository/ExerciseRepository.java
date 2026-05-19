package com.fitness.system.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.fitness.system.model.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
    // Get exercises by purpose
    List<Exercise> findByPurpose(String purpose);  // ARM_FAT / FULL_BODY / WEIGHT_LOSS
}