package com.fitness.system.controller;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;
import com.fitness.system.model.Diet;
import com.fitness.system.service.DietService;

@RestController
@RequestMapping("/diet")
@CrossOrigin
public class DietController {

    private final DietService dietService;

    public DietController(DietService dietService) {
        this.dietService = dietService;
    }

    // Get all diets
    @GetMapping
    public List<Diet> getDiets() {
        return dietService.getAllDiets();
    }

    // Get daily diet plan based on goal
    @GetMapping("/daily")
    public Map<String, Diet> getDailyDietPlan(@RequestParam String dietType) {
        return dietService.getDailyDietPlan(dietType);
    }
}