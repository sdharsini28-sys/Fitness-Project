import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", credentials);
      console.log("Login Success:", response.data);

      // Store token - use sessionStorage if not remember me, localStorage if remember me
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", response.data.token);

      alert("Login Successful!");
      navigate("/"); // redirect to home/dashboard
    } catch (error) {
      console.error("Login Error:", error);
      alert("Invalid Email or Password");
    }
  };

  const handleGoogleLogin = () => {
    
    alert("Google login integration requires backend OAuth setup. Please use email/password for now.");
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
            type={showPassword ? "text" : "password"}
            value={credentials.password}
            onChange={handleChange}
            margin="dense"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/forgot-password")}
              sx={{ textDecoration: "none" }}
            >
              Forgot password?
            </Link>
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          <Divider sx={{ my: 2 }}>or</Divider>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            startIcon={<Google />}
            onClick={handleGoogleLogin}
            sx={{ mb: 2 }}
          >
            Continue with Google
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