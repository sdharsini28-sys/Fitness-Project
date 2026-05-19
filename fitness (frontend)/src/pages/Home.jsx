import React, { useState } from "react";
import { Box, Typography, Button, Container, Grid, Card, CardContent, CardMedia, Paper, TextField, Accordion, AccordionSummary, AccordionDetails, IconButton, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Home = () => {
  const [bmiData, setBmiData] = useState({
    weight: '',
    height: '',
    bmi: null,
    category: ''
  });

  const calculateBMI = () => {
    const weight = parseFloat(bmiData.weight);
    const height = parseFloat(bmiData.height) / 100; // Convert cm to m
    
    if (weight && height) {
      const bmi = (weight / (height * height)).toFixed(1);
      let category = '';
      
      if (bmi < 18.5) category = 'Underweight';
      else if (bmi < 25) category = 'Normal weight';
      else if (bmi < 30) category = 'Overweight';
      else category = 'Obese';
      
      setBmiData({ ...bmiData, bmi, category });
    }
  };

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
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
            Welcome to FitLife Portal
          </Typography>
          <Typography variant="h5" sx={{ mb: 4 }}>
            Track your workouts, diet, and fitness progress with ease.
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

      {/* BMI Calculator Section */}
      <Box sx={{ bgcolor: "primary.main", color: "white", py: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 4 }}>
            BMI Calculator
          </Typography>
          <Typography variant="h6" align="center" sx={{ mb: 6 }}>
            Calculate your Body Mass Index to understand your health status
          </Typography>
          
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, bgcolor: "rgba(255,255,255,0.1)" }}>
                <Typography variant="h6" gutterBottom color="white">
                  Enter Your Details
                </Typography>
                <TextField
                  fullWidth
                  label="Weight (kg)"
                  type="number"
                  value={bmiData.weight}
                  onChange={(e) => setBmiData({ ...bmiData, weight: e.target.value })}
                  sx={{ mb: 2, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                  inputProps={{ style: { color: 'white' } }}
                />
                <TextField
                  fullWidth
                  label="Height (cm)"
                  type="number"
                  value={bmiData.height}
                  onChange={(e) => setBmiData({ ...bmiData, height: e.target.value })}
                  sx={{ mb: 3, '& .MuiOutlinedInput-root': { color: 'white' }, '& .MuiInputLabel-root': { color: 'white' } }}
                  InputLabelProps={{ style: { color: 'white' } }}
                  inputProps={{ style: { color: 'white' } }}
                />
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth 
                  onClick={calculateBMI}
                  sx={{ py: 1.5 }}
                >
                  Calculate BMI
                </Button>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card sx={{ p: 3, bgcolor: "rgba(255,255,255,0.1)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Typography variant="h6" gutterBottom color="white">
                  Your BMI Result
                </Typography>
                {bmiData.bmi ? (
                  <>
                    <Typography variant="h3" color="secondary.main" sx={{ mb: 2, fontWeight: "bold" }}>
                      {bmiData.bmi}
                    </Typography>
                    <Typography variant="h5" color="white" sx={{ mb: 2 }}>
                      {bmiData.category}
                    </Typography>
                    <Typography variant="body1" color="white">
                      BMI Categories:<br/>
                      • Underweight: &lt; 18.5<br/>
                      • Normal: 18.5 - 24.9<br/>
                      • Overweight: 25 - 29.9<br/>
                      • Obese: ≥ 30
                    </Typography>
                  </>
                ) : (
                  <Typography variant="body1" color="white">
                    Enter your weight and height to calculate your BMI
                  </Typography>
                )}
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Fitness Goals Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Choose Your Fitness Goals
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: "center", p: 3, height: "100%", "&:hover": { transform: "translateY(-5px)", transition: "0.3s" } }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "primary.main", mx: "auto", mb: 2 }}>
                🏃‍♂️
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Weight Loss
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Burn fat and achieve your ideal weight with personalized diet and exercise plans.
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: "center", p: 3, height: "100%", "&:hover": { transform: "translateY(-5px)", transition: "0.3s" } }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "success.main", mx: "auto", mb: 2 }}>
                💪
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Muscle Gain
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Build strength and muscle mass with targeted workouts and nutrition guidance.
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: "center", p: 3, height: "100%", "&:hover": { transform: "translateY(-5px)", transition: "0.3s" } }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "warning.main", mx: "auto", mb: 2 }}>
                ❤️
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Improve Health
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Enhance cardiovascular health, flexibility, and overall wellness.
              </Typography>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Card sx={{ textAlign: "center", p: 3, height: "100%", "&:hover": { transform: "translateY(-5px)", transition: "0.3s" } }}>
              <Avatar sx={{ width: 80, height: 80, bgcolor: "info.main", mx: "auto", mb: 2 }}>
                🏆
              </Avatar>
              <Typography variant="h6" gutterBottom>
                Sports Performance
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Train like an athlete with sport-specific conditioning and recovery programs.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
          Frequently Asked Questions
        </Typography>
        
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">How do I get started with FitLife?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Simply create a free account, fill out your profile with your fitness goals, and our AI will generate a personalized workout and diet plan tailored to your needs.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Is FitLife suitable for beginners?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Absolutely! Our platform is designed for all fitness levels. Beginners will receive modified exercises and gradual progression plans to build confidence and strength safely.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Can I access FitLife on my mobile device?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! FitLife is fully responsive and works perfectly on smartphones, tablets, and desktop computers. You can track your workouts and meals anywhere, anytime.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">What makes FitLife different from other fitness apps?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                FitLife combines AI-powered personalization with expert trainer guidance. Our comprehensive approach includes workout tracking, nutrition planning, progress analytics, and direct access to certified trainers.
              </Typography>
            </AccordionDetails>
          </Accordion>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Do you offer meal planning services?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Yes! Based on your dietary preferences, caloric needs, and fitness goals, we provide customized meal plans with recipes, nutritional information, and grocery lists.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;