import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import API from "../services/api";

const mealCategories = [
  { value: "WEIGHT_LOSS", label: "Weight Loss", color: "error" },
  { value: "WEIGHT_GAIN", label: "Muscle Gain", color: "primary" },
  { value: "MAINTAIN_WEIGHT", label: "Maintenance", color: "success" },
  { value: "BALANCED_DIET", label: "Balanced", color: "secondary" },
];

const activityLevels = [
  { value: "sedentary", label: "Sedentary" },
  { value: "light", label: "Light Activity" },
  { value: "moderate", label: "Moderate Activity" },
  { value: "active", label: "Active" },
];

const DietPlan = () => {
  const [goal, setGoal] = useState("WEIGHT_LOSS");

  const [plan, setPlan] = useState({});

  const [weeklyPlan, setWeeklyPlan] = useState([]);

  const [foodSearchTerm, setFoodSearchTerm] = useState("");

  const [foodResults, setFoodResults] = useState([]);

  const [allFoods, setAllFoods] = useState([]);

  const [selectedFood, setSelectedFood] = useState(null);

  const [calorieForm, setCalorieForm] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    activity: "moderate",
  });

  const [calorieResult, setCalorieResult] = useState(null);

  const [waterGoal, setWaterGoal] = useState(0);

  const [macroBreakdown, setMacroBreakdown] = useState({
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  useEffect(() => {
    fetchDietFoods();
  }, []);

  const fetchDietFoods = async () => {
    try {
      const response = await API.get("/diets");

      const formattedFoods = response.data.map((item) => ({
        id: item.id,
        name: item.mealName,
        category: item.mealType,
        calories: item.calories,
        protein: item.protein,
        carbs: item.carbs,
        fat: item.fat,
        fiber: 0,
      }));

      setAllFoods(formattedFoods);
      setFoodResults(formattedFoods);

    } catch (error) {
      console.error("Error fetching diet data:", error);
    }
  };

  const handleGoalChange = (event) => {
    setGoal(event.target.value);
  };

  const handleCalorieChange = (field, value) => {
    setCalorieForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const activityMultiplier = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
  };

  const macroRatios = {
    WEIGHT_LOSS: { protein: 0.35, carbs: 0.4, fat: 0.25 },

    WEIGHT_GAIN: { protein: 0.3, carbs: 0.45, fat: 0.25 },

    MAINTAIN_WEIGHT: { protein: 0.3, carbs: 0.4, fat: 0.3 },

    BALANCED_DIET: { protein: 0.3, carbs: 0.45, fat: 0.25 },
  };

  const calculateCalories = () => {
    const age = Number(calorieForm.age);

    const weight = Number(calorieForm.weight);

    const height = Number(calorieForm.height);

    if (!age || !weight || !height) {
      alert("Please enter age, weight, and height");
      return;
    }

    const bmr =
      calorieForm.gender === "male"
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;

    const calorieTarget = Math.round(
      bmr *
        activityMultiplier[calorieForm.activity] *
        (goal === "WEIGHT_LOSS"
          ? 0.85
          : goal === "WEIGHT_GAIN"
          ? 1.15
          : 1)
    );

    const ratios = macroRatios[goal];

    setCalorieResult(calorieTarget);

    setMacroBreakdown({
      protein: Math.round((calorieTarget * ratios.protein) / 4),

      carbs: Math.round((calorieTarget * ratios.carbs) / 4),

      fat: Math.round((calorieTarget * ratios.fat) / 9),
    });

    setWaterGoal(
      Math.max(1.5, Math.round(weight * 0.035 * 10) / 10)
    );
  };

  const generateDiet = async () => {
  try {
    const response = await API.get(`/diets/type/${goal}`);

    const diets = response.data;

    if (diets.length === 0) {
      alert("No diet data found in database");
      return;
    }

    // Separate meals
    const breakfasts = diets.filter(
      (d) => d.mealType?.toUpperCase() === "BREAKFAST"
    );

    const lunches = diets.filter(
      (d) => d.mealType?.toUpperCase() === "LUNCH"
    );

    const dinners = diets.filter(
      (d) => d.mealType?.toUpperCase() === "DINNER"
    );

    // Random picker
    const randomItem = (arr) =>
      arr[Math.floor(Math.random() * arr.length)];

    const breakfast =
      breakfasts.length > 0
        ? randomItem(breakfasts)
        : diets[0];

    const lunch =
      lunches.length > 0
        ? randomItem(lunches)
        : diets[1] || diets[0];

    const dinner =
      dinners.length > 0
        ? randomItem(dinners)
        : diets[2] || diets[0];

    const generatedPlan = {
      BREAKFAST: {
        dietType: breakfast.mealType,
        description: breakfast.mealName,
        calories: breakfast.calories,
      },

      LUNCH: {
        dietType: lunch.mealType,
        description: lunch.mealName,
        calories: lunch.calories,
      },

      DINNER: {
        dietType: dinner.mealType,
        description: dinner.mealName,
        calories: dinner.calories,
      },
    };

    setPlan(generatedPlan);

    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    // Random weekly plan
    setWeeklyPlan(
      days.map((day) => ({
        day,

        breakfast: {
          description:
            randomItem(breakfasts)?.mealName ||
            breakfast.mealName,
        },

        lunch: {
          description:
            randomItem(lunches)?.mealName ||
            lunch.mealName,
        },

        dinner: {
          description:
            randomItem(dinners)?.mealName ||
            dinner.mealName,
        },
      }))
    );

  } catch (error) {
    console.error("Diet Fetch Error:", error);
    alert("Failed to fetch diets from database");
  }
};
  const handleFoodSearch = (term) => {
    setFoodSearchTerm(term);

    setFoodResults(
      allFoods.filter(
        (food) =>
          food.name.toLowerCase().includes(term.toLowerCase()) ||
          food.category.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  const refreshFoodSelection = (food) => {
    setSelectedFood(food);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        position: "relative",

        backgroundImage:
          "url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop)",

        backgroundSize: "cover",

        py: 4,

        px: 2,

        "&::before": {
          content: '""',

          position: "absolute",

          top: 0,

          left: 0,

          width: "100%",

          height: "100%",

          backgroundColor: "rgba(0,0,0,0.45)",

          zIndex: 0,
        },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          position: "relative",

          zIndex: 1,

          width: "100%",

          maxWidth: 1200,

          p: 4,

          borderRadius: 4,

          bgcolor: "rgba(255,255,255,0.96)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="primary.main"
          mb={1}
        >
          Personalized Diet & Nutrition Planner
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          Generate a daily meal plan, calculate calorie needs,
          and explore nutrition facts from database.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Daily Goal
                </Typography>

                <FormControl fullWidth sx={{ mt: 1 }}>
                  <InputLabel>Goal</InputLabel>

                  <Select
                    value={goal}
                    label="Goal"
                    onChange={handleGoalChange}
                  >
                    {mealCategories.map((item) => (
                      <MenuItem
                        key={item.value}
                        value={item.value}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={generateDiet}
                >
                  Generate Diet Plan
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Calorie & Macro Calculator
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Age"
                      type="number"
                      value={calorieForm.age}
                      onChange={(e) =>
                        handleCalorieChange(
                          "age",
                          e.target.value
                        )
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Weight"
                      type="number"
                      value={calorieForm.weight}
                      onChange={(e) =>
                        handleCalorieChange(
                          "weight",
                          e.target.value
                        )
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      label="Height"
                      type="number"
                      value={calorieForm.height}
                      onChange={(e) =>
                        handleCalorieChange(
                          "height",
                          e.target.value
                        )
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Gender</InputLabel>

                      <Select
                        value={calorieForm.gender}
                        label="Gender"
                        onChange={(e) =>
                          handleCalorieChange(
                            "gender",
                            e.target.value
                          )
                        }
                      >
                        <MenuItem value="male">
                          Male
                        </MenuItem>

                        <MenuItem value="female">
                          Female
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel>Activity</InputLabel>

                      <Select
                        value={calorieForm.activity}
                        label="Activity"
                        onChange={(e) =>
                          handleCalorieChange(
                            "activity",
                            e.target.value
                          )
                        }
                      >
                        {activityLevels.map((level) => (
                          <MenuItem
                            key={level.value}
                            value={level.value}
                          >
                            {level.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mt: 3 }}
                  onClick={calculateCalories}
                >
                  Calculate Needs
                </Button>

                {calorieResult !== null && (
                  <Box mt={3}>
                    <Typography fontWeight="bold">
                      Estimated Daily Calories:
                      {calorieResult} kcal
                    </Typography>

                    <Grid container spacing={1} mt={1}>
                      <Grid item>
                        <Chip
                          label={`Protein: ${macroBreakdown.protein}g`}
                          color="primary"
                        />
                      </Grid>

                      <Grid item>
                        <Chip
                          label={`Carbs: ${macroBreakdown.carbs}g`}
                          color="success"
                        />
                      </Grid>

                      <Grid item>
                        <Chip
                          label={`Fat: ${macroBreakdown.fat}g`}
                          color="warning"
                        />
                      </Grid>

                      <Grid item>
                        <Chip
                          label={`Water: ${waterGoal}L`}
                          color="info"
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {Object.keys(plan).length > 0 && (
          <Box>
            <Typography variant="h5" mb={2}>
              Today's Meal Plan
            </Typography>

            <Grid container spacing={2}>
              {["BREAKFAST", "LUNCH", "DINNER"].map(
                (meal) =>
                  plan[meal] ? (
                    <Grid item xs={12} md={4} key={meal}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                          >
                            {meal}
                          </Typography>

                          <Typography color="text.secondary">
                            {plan[meal].dietType}
                          </Typography>

                          <Typography sx={{ mt: 1 }}>
                            {plan[meal].description}
                          </Typography>

                          <Typography
                            sx={{ mt: 2 }}
                            fontWeight="bold"
                          >
                            {plan[meal].calories} kcal
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ) : null
              )}
            </Grid>
          </Box>
        )}

        {weeklyPlan.length > 0 && (
          <Box mt={4}>
            <Typography variant="h5" mb={2}>
              Weekly Meal Planner
            </Typography>

            <List>
              {weeklyPlan.map((dayPlan) => (
                <React.Fragment key={dayPlan.day}>
                  <ListItem>
                    <ListItemText
                      primary={dayPlan.day}
                      secondary={`B: ${dayPlan.breakfast.description} | L: ${dayPlan.lunch.description} | D: ${dayPlan.dinner.description}`}
                    />
                  </ListItem>

                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </Box>
        )}

        <Box mt={4}>
          <Typography variant="h5" mb={2}>
            Diet Recipes 
          </Typography>

          <Grid container spacing={2}>
            {foodResults.map((food) => (
              <Grid item xs={12} md={4} key={food.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                    >
                      {food.name}
                    </Typography>

                    <Typography color="text.secondary">
                      {food.category}
                    </Typography>

                    <Grid
                      container
                      spacing={1}
                      sx={{ mt: 2 }}
                    >
                      <Grid item>
                        <Chip
                          label={`${food.calories} kcal`}
                          size="small"
                        />
                      </Grid>

                      <Grid item>
                        <Chip
                          label={`Protein ${food.protein}g`}
                          size="small"
                          color="primary"
                        />
                      </Grid>

                      <Grid item>
                        <Chip
                          label={`Carbs ${food.carbs}g`}
                          size="small"
                          color="success"
                        />
                      </Grid>

                      <Grid item>
                        <Chip
                          label={`Fat ${food.fat}g`}
                          size="small"
                          color="warning"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mt={4}>
          <Typography variant="h5" mb={2}>
            Food Search & Nutrition Facts
          </Typography>

          <TextField
            fullWidth
            label="Search foods"
            value={foodSearchTerm}
            onChange={(e) =>
              handleFoodSearch(e.target.value)
            }
          />

          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={6}>
              <Paper
                variant="outlined"
                sx={{
                  maxHeight: 260,
                  overflow: "auto",
                  mt: 1,
                }}
              >
                <List dense>
                  {foodResults.map((food) => (
                    <ListItem
                      button
                      key={food.id}
                      selected={
                        selectedFood?.id === food.id
                      }
                      onClick={() =>
                        refreshFoodSelection(food)
                      }
                    >
                      <ListItemText
                        primary={food.name}
                        secondary={`${food.category} • ${food.calories} kcal`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                <CardContent>
                  {selectedFood ? (
                    <>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                      >
                        {selectedFood.name}
                      </Typography>

                      <Typography color="text.secondary">
                        {selectedFood.category}
                      </Typography>

                      <Typography>
                        Calories:
                        {selectedFood.calories} kcal
                      </Typography>

                      <Typography>
                        Protein:
                        {selectedFood.protein} g
                      </Typography>

                      <Typography>
                        Carbs:
                        {selectedFood.carbs} g
                      </Typography>

                      <Typography>
                        Fat:
                        {selectedFood.fat} g
                      </Typography>
                    </>
                  ) : (
                    <Typography color="text.secondary">
                      Select a food item
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default DietPlan;