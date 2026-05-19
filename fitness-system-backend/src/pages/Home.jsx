import React from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          backgroundImage: "url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.6)", // Overlay for readability
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
            Welcome to FitLife Portal
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Track your workouts, diet, and fitness progress with ease.
            Personalized plans based on your age, weight, and height.
          </Typography>
          <Button 
            variant="contained" 
            color="success" 
            size="large" 
            component={Link} 
            to="/registration"
            sx={{ px: 4, py: 1.5, fontSize: "1.2rem" }}
          >
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Everything You Need to Succeed
        </Typography>
        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop"
                alt="Workout Tracking"
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Workout Tracking
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Log your daily exercises, sets, and reps. Keep a history of your performance and push your limits every day.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1470&auto=format&fit=crop"
                alt="Diet Plans"
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Smart Diet Plans
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Get personalized meal recommendations based on your caloric needs and nutritional goals. Eat smart, live healthy.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop"
                alt="Progress Analytics"
              />
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Progress Analytics
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Visualize your journey with intuitive charts and graphs. Monitor your weight changes and consistency over time.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Motivation Section */}
      <Box sx={{ bgcolor: "grey.100", py: 8 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 6, textAlign: "center", borderRadius: 4 }}>
            <Typography variant="h4" gutterBottom color="primary">
              Ready to start your fitness journey?
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              "The only bad workout is the one that didn't happen."
            </Typography>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              component={Link}
              to="/registration"
            >
              Join Now
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
