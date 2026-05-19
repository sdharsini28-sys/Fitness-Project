
package com.fitness.system.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;

import com.fitness.system.model.Exercise;
import com.fitness.system.service.ExerciseService;

@RestController
@RequestMapping("/exercise")
@CrossOrigin
public class ExerciseController {

    private final ExerciseService exerciseService;

    public ExerciseController(ExerciseService exerciseService) {
        this.exerciseService = exerciseService;
    }

    // Get all exercises
    @GetMapping
    public List<Exercise> getExercises() {
        return exerciseService.getAllExercises();
    }

    // Get random exercise by purpose
    @GetMapping("/random")
    public Exercise getRandomExercise(@RequestParam String purpose) {
        return exerciseService.getRandomExercise(purpose);
    }
}