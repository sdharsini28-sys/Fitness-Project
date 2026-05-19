package com.fitness.system.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.fitness.system.model.WorkoutProgress;
import com.fitness.system.service.WorkoutProgressService;

@RestController
@RequestMapping("/workout")
@CrossOrigin
public class WorkoutProgressController {

    private final WorkoutProgressService service;

    public WorkoutProgressController(WorkoutProgressService service) {
        this.service = service;
    }

    @PostMapping("/complete")
    public WorkoutProgress completeWorkout(@RequestBody WorkoutProgress progress) {

        progress.setWorkoutDate(LocalDate.now());

        return service.saveWorkout(progress);
    }

    @GetMapping
    public List<WorkoutProgress> getAllWorkouts() {
        return service.getAllWorkouts();
    }
}