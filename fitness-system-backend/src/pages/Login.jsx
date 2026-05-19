import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", credentials);
      console.log("Login Success:", response.data);

      // Store token or user info if backend returns JWT
      localStorage.setItem("token", response.data.token);

      alert("Login Successful!");
      navigate("/"); // redirect to home/dashboard
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid Email or Password");
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
          "url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop)",
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
          maxWidth: 400,
          width: "100%",
          p: 4,
          borderRadius: 4,
          bgcolor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleChange}
            margin="dense"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={credentials.password}
            onChange={handleChange}
            margin="dense"
            required
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3, mb: 1 }}
          >
            Login
          </Button>

          <Typography textAlign="center" variant="body2">
            Don't have an account?{" "}
            <Button
              variant="text"
              color="primary"
              onClick={() => navigate("/registration")}
            >
              Sign Up
            </Button>
          </Typography>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;