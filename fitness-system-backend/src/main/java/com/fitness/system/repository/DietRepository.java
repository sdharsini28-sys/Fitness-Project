package com.fitness.system.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.fitness.system.model.Diet;

public interface DietRepository extends JpaRepository<Diet, Long> {
    List<Diet> findByDietTypeAndMealTime(String dietType, String mealTime);
}