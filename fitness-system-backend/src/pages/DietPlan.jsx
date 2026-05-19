import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Button, Paper, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import API from "../services/api";

const DietPlan = () => {
  const [goal, setGoal] = useState(""); // WEIGHT_LOSS / WEIGHT_GAIN / MAINTAIN_WEIGHT / BALANCED_DIET
  const [plan, setPlan] = useState({}); // {BREAKFAST: {}, LUNCH: {}, DINNER: {}}

  const handleGoalChange = (event) => setGoal(event.target.value);

  const generateDiet = async () => {
    if (!goal) {
      alert("Please select a goal first!");
      return;
    }
    try {
      const response = await API.get(`/diet/daily?dietType=${goal}`);
      setPlan(response.data);
    } catch (error) {
      console.error("Diet API Error:", error);
      setPlan({});
      alert("Failed to fetch diet plan from server.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        backgroundImage: "url(https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1470&auto=format&fit=crop)",
        backgroundSize: "cover",
        py: 4,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 0,
        },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 600,
          width: "100%",
          p: 4,
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.95)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary.main" mb={2}>
          Personalized Diet Plan
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Goal</InputLabel>
          <Select value={goal} label="Goal" onChange={handleGoalChange}>
            <MenuItem value="WEIGHT_LOSS">Weight Loss</MenuItem>
            <MenuItem value="WEIGHT_GAIN">Weight Gain</MenuItem>
            <MenuItem value="MAINTAIN_WEIGHT">Maintain Weight</MenuItem>
            <MenuItem value="BALANCED_DIET">Balanced Diet</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={generateDiet}>
          Generate Diet Plan
        </Button>

        {Object.keys(plan).length > 0 && (
          <Box mt={3}>
            {["BREAKFAST", "LUNCH", "DINNER"].map((meal) =>
              plan[meal] ? (
                <Card key={meal} variant="outlined" sx={{ mt: 2, borderColor: "primary.main" }}>
                  <CardContent>
                    <Typography variant="h6" color="primary.dark" fontWeight="bold">{meal}</Typography>
                    <Typography>
                      {`${plan[meal].dietType} - ${plan[meal].description} [${plan[meal].calories} kcal]`}
                    </Typography>
                  </CardContent>
                </Card>
              ) : null
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default DietPlan;