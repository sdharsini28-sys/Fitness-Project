import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Registration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",   // ✅ added
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    goal: "",
    activityLevel: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/register", form);
      console.log("User Registered:", response.data);
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Registration Failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1375&auto=format&fit=crop)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        py: 4,
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
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
          bgcolor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={1}>
          Create Account
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Join us to start your fitness journey
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>

          {/* Account Fields */}
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Account Info
          </Typography>

          {/* ✅ USERNAME FIELD */}
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            margin="dense"
            required
          />

          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            margin="dense"
            required
          />

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            margin="dense"
            required
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            margin="dense"
            required
          />

          {/* Physical Info */}
          <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>
            Physical Info
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth size="small" required>
                <Select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  displayEmpty
                  renderValue={(selected) => selected || "Gender"}
                >
                  <MenuItem value="" disabled>
                    Gender
                  </MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={form.weight}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Height (cm)"
                name="height"
                type="number"
                value={form.height}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>
          </Grid>

          <FormControl fullWidth margin="dense" required sx={{ mt: 2 }}>
            <InputLabel id="goal-label">Fitness Goal</InputLabel>
            <Select
              labelId="goal-label"
              name="goal"
              value={form.goal}
              label="Fitness Goal"
              onChange={handleChange}
            >
              <MenuItem value="weight_loss">Weight Loss</MenuItem>
              <MenuItem value="muscle_gain">Muscle Gain</MenuItem>
              <MenuItem value="maintain">Maintain Weight</MenuItem>
              <MenuItem value="endurance">Improve Endurance</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="dense" required sx={{ mt: 2 }}>
            <InputLabel id="activity-label">Activity Level</InputLabel>
            <Select
              labelId="activity-label"
              name="activityLevel"
              value={form.activityLevel}
              label="Activity Level"
              onChange={handleChange}
            >
              <MenuItem value="sedentary">
                Sedentary (Little to no exercise)
              </MenuItem>
              <MenuItem value="light">
                Lightly Active (1-3 days/week)
              </MenuItem>
              <MenuItem value="moderate">
                Moderately Active (3-5 days/week)
              </MenuItem>
              <MenuItem value="active">
                Very Active (6-7 days/week)
              </MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3, mb: 1 }}
          >
            Register
          </Button>

          <Typography textAlign="center" variant="body2">
            Already have an account?{" "}
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          </Typography>

        </form>
      </Paper>
    </Box>
  );
};

export default Registration;