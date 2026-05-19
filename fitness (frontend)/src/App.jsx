import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Exercise from "./pages/Exercise";
import DietPlan from "./pages/DietPlan";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Workout from "./pages/Workout";
import ForgotPassword from "./pages/ForgotPassword";
import ProfileSetup from "./pages/ProfileSetup";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />

          {/* Exercise */}
          <Route
            path="/exercise"
            element={
              <>
                <Exercise />
              </>
            }
          />

          <Route path="/diet" element={<DietPlan />} />
          <Route path="/about" element={<About />} />

          {/* 🔥 NEW ROUTES */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workout" element={<Workout />} />
        </Routes>

        <Footer />
      </Router>
    </ThemeProvider>
  );
};

export default App;