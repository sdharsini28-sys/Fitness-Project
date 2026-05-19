package com.fitness.system.model;

import jakarta.persistence.*;

@Entity
public class Diet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dietType;   // WEIGHT_LOSS / WEIGHT_GAIN
    private String mealTime;
    private String description;
    private int calories;

    public Diet() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getDietType() { return dietType; }
    public void setDietType(String dietType) { this.dietType = dietType; }

    public String getMealTime() { return mealTime; }
    public void setMealTime(String mealTime) { this.mealTime = mealTime; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getCalories() { return calories; }
    public void setCalories(int calories) { this.calories = calories; }
}
