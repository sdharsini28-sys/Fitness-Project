import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import API from "../services/api";

const Exercise = () => {
  const [purpose, setPurpose] = useState("");
  const [exercise, setExercise] = useState(null);

  const handlePurposeChange = (e) => setPurpose(e.target.value);

  const generateExercise = async () => {
    if (!purpose) {
      alert("Please select a purpose first!");
      return;
    }

    try {
      const response = await API.get(`/exercise/random?purpose=${purpose}`);
      setExercise(response.data);
    } catch (error) {
      console.error("Exercise API Error:", error);
      setExercise({
        exerciseName: "Server Error",
        description: "Unable to fetch exercise from backend.",
        purpose: "",
      });
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
        backgroundImage:
          "url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop)",
        backgroundSize: "cover",
        py: 4,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 0,
        },
      }}
    >
      <Paper
        elevation={6}
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: 500,
          width: "100%",
          p: 4,
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.95)",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="primary.main" mb={3}>
          Random Exercise Plan
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Select Purpose</InputLabel>
          <Select value={purpose} label="Select Purpose" onChange={handlePurposeChange}>
            <MenuItem value="ARM_FAT">Arm Fat</MenuItem>
            <MenuItem value="FULL_BODY">Full Body</MenuItem>
            <MenuItem value="WEIGHT_LOSS">Weight Loss</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={generateExercise}
        >
          Generate Exercise
        </Button>

        {exercise && (
          <Card variant="outlined" sx={{ mt: 4, borderColor: "primary.main" }}>
            <CardContent>

              <Typography
                variant="h6"
                color="primary.dark"
                fontWeight="bold"
                gutterBottom
              >
                {exercise.exerciseName}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Purpose: {exercise.purpose}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {exercise.description}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Duration: {exercise.duration} min
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Difficulty: {exercise.difficulty}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Calories Burn: {exercise.caloriesBurn} kcal
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Target Muscle: {exercise.targetMuscle}
              </Typography>

            </CardContent>
          </Card>
        )}
      </Paper>
    </Box>
  );
};

export default Exercise;