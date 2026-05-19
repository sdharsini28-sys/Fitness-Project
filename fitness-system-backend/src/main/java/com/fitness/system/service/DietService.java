package com.fitness.system.service;

import java.util.List;
import java.util.Map;
import com.fitness.system.model.Diet;

public interface DietService {
    List<Diet> getAllDiets();
    Map<String, Diet> getDailyDietPlan(String dietType);
}