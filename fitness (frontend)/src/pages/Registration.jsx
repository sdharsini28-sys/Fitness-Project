// src/pages/Registration.jsx

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
  IconButton,
  InputAdornment,
  LinearProgress,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Registration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    weight: "",
    height: "",
    goal: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;

    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;

    return strength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        name: form.name,
        email: form.email,
        password: form.password,
        age: parseInt(form.age),
        weight: parseFloat(form.weight),
        height: parseFloat(form.height),
        goal: form.goal,
      };

      const response = await API.post(
        "/auth/register",
        userData
      );

      console.log("Registration Success:", response.data);

      alert("Registration Successful!");

      navigate("/login");

    } catch (error) {
      console.error("Registration Error:", error);

      if (error.response) {
        alert(error.response.data);
      } else {
        alert("Server Error");
      }
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
          maxWidth: 500,
          width: "100%",
          p: 4,
          borderRadius: 4,
          bgcolor: "rgba(255,255,255,0.95)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={3}
        >
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>

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
            label="Email"
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
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            margin="dense"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {form.password && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="body2">
                Password Strength
              </Typography>

              <LinearProgress
                variant="determinate"
                value={passwordStrength}
                sx={{
                  height: 8,
                  borderRadius: 5,
                }}
              />
            </Box>
          )}

          <Grid container spacing={2} sx={{ mt: 2 }}>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Age"
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={form.weight}
                onChange={handleChange}
                required
              />
            </Grid>

          </Grid>

          <TextField
            fullWidth
            label="Height (cm)"
            name="height"
            type="number"
            value={form.height}
            onChange={handleChange}
            margin="dense"
            required
          />

          <FormControl
            fullWidth
            margin="dense"
            required
          >
            <InputLabel>Fitness Goal</InputLabel>

            <Select
              name="goal"
              value={form.goal}
              label="Fitness Goal"
              onChange={handleChange}
            >
              <MenuItem value="Weight Loss">
                Weight Loss
              </MenuItem>

              <MenuItem value="Muscle Gain">
                Muscle Gain
              </MenuItem>

              <MenuItem value="Maintain Weight">
                Maintain Weight
              </MenuItem>

              <MenuItem value="Endurance">
                Improve Endurance
              </MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
          >
            Register
          </Button>

          <Typography
            textAlign="center"
            variant="body2"
            mt={2}
          >
            Already have an account?

            <Button
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