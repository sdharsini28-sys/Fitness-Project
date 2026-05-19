package com.fitness.system.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.stereotype.Service;
import com.fitness.system.model.Diet;
import com.fitness.system.repository.DietRepository;
import com.fitness.system.service.DietService;

@Service
public class DietServiceImpl implements DietService {

    private final DietRepository dietRepository;
    private final Random random = new Random();

    public DietServiceImpl(DietRepository dietRepository) {
        this.dietRepository = dietRepository;
    }

    @Override
    public List<Diet> getAllDiets() {
        return dietRepository.findAll();
    }

    @Override
    public Map<String, Diet> getDailyDietPlan(String dietType) {
        Map<String, Diet> dailyPlan = new HashMap<>();

        // Breakfast
        List<Diet> breakfast = dietRepository.findByDietTypeAndMealTime(dietType, "BREAKFAST");
        if (!breakfast.isEmpty()) {
            dailyPlan.put("BREAKFAST", breakfast.get(random.nextInt(breakfast.size())));
        }

        // Lunch
        List<Diet> lunch = dietRepository.findByDietTypeAndMealTime(dietType, "LUNCH");
        if (!lunch.isEmpty()) {
            dailyPlan.put("LUNCH", lunch.get(random.nextInt(lunch.size())));
        }

        // Dinner
        List<Diet> dinner = dietRepository.findByDietTypeAndMealTime(dietType, "DINNER");
        if (!dinner.isEmpty()) {
            dailyPlan.put("DINNER", dinner.get(random.nextInt(dinner.size())));
        }

        return dailyPlan;
    }
}