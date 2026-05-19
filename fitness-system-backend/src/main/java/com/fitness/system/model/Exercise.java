package com.fitness.system.model;

import jakarta.persistence.*;

@Entity
public class Exercise {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String exerciseName;

    @Column(length = 1000)
    private String description;

    private String purpose;

    private int duration;

    // NEW COLUMNS
    private String difficulty;

    private int caloriesBurn;

    private String targetMuscle;

    public Exercise() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getExerciseName() { return exerciseName; }
    public void setExerciseName(String exerciseName) { this.exerciseName = exerciseName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }

    public int getDuration() { return duration; }
    public void setDuration(int duration) { this.duration = duration; }

    // NEW GETTERS SETTERS

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public int getCaloriesBurn() { return caloriesBurn; }
    public void setCaloriesBurn(int caloriesBurn) { this.caloriesBurn = caloriesBurn; }

    public String getTargetMuscle() { return targetMuscle; }
    public void setTargetMuscle(String targetMuscle) { this.targetMuscle = targetMuscle; }
}