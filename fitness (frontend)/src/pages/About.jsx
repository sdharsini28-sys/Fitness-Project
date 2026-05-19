import React from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import Footer from "../components/Footer";

const About = () => {
  return (
    <Box sx={{ minHeight: "80vh", py: 5, px: 2, bgcolor: "grey.50" }}>
      <Paper sx={{ maxWidth: 800, mx: "auto", p: 4, borderRadius: 2 }}>
        <Typography variant="h3" fontWeight="bold" mb={2} color="primary.main">
          About Fitness System
        </Typography>

        <Typography variant="body1" mb={2}>
          Welcome to Fitness System — your all-in-one platform to track your health, plan personalized diets, and follow effective workout routines. 
          Our mission is to make fitness simple, fun, and achievable for everyone, regardless of age or experience.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight="bold" mb={1}>
          Our Features
        </Typography>
        <ul>
          <li>Personalized Diet Plans based on your goals (Weight Loss, Muscle Gain, or Maintenance).</li>
          <li>Custom Exercise Plans tailored to your body type and activity level.</li>
          <li>User Registration and Profile Management.</li>
          <li>Interactive and easy-to-use interface for tracking progress.</li>
        </ul>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h5" fontWeight="bold" mb={1}>
          Our Vision
        </Typography>
        <Typography variant="body1">
          Fitness System aims to empower individuals to take control of their health by providing personalized, science-backed guidance in a simple and accessible way. 
          We believe that everyone can achieve their fitness goals with the right tools and motivation.
        </Typography>
      </Paper>

    </Box>
  );
};

export default About;