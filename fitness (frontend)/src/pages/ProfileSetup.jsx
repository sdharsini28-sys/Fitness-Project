import React, { useState, useEffect } from "react";
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
  Avatar,
  IconButton,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const ProfileSetup = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    goal: "",
    activityLevel: "",
    bio: "",
    profilePicture: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Load existing user data if available
    const loadUserData = async () => {
      try {
        const response = await API.get("/auth/profile");
        setProfile(prev => ({ ...prev, ...response.data }));
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    loadUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, profilePicture: file });
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(profile).forEach(key => {
        if (profile[key] !== null) {
          formData.append(key, profile[key]);
        }
      });

      const response = await API.put("/auth/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Profile Updated:", response.data);
      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Profile Update Error:", error);
      alert("Failed to update profile");
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
          maxWidth: 600,
          width: "100%",
          p: 4,
          borderRadius: 4,
          bgcolor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={1}>
          Complete Your Profile
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          textAlign="center"
          mb={3}
        >
          Tell us more about yourself to personalize your fitness journey
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={previewImage}
              sx={{ width: 100, height: 100 }}
            />
            <IconButton
              color="primary"
              component="label"
              sx={{
                position: "absolute",
                bottom: 0,
                right: 0,
                backgroundColor: "white",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
              <PhotoCamera />
            </IconButton>
          </Box>
        </Box>

        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            margin="dense"
            required
          />

          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            margin="dense"
            required
          />

          <TextField
            fullWidth
            label="Bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            margin="dense"
            multiline
            rows={3}
            placeholder="Tell us about yourself..."
          />

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
                value={profile.age}
                onChange={handleChange}
                required
                size="small"
              />
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth size="small" required>
                <Select
                  name="gender"
                  value={profile.gender}
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
                value={profile.weight}
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
                value={profile.height}
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
              value={profile.goal}
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
              value={profile.activityLevel}
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
            Save Profile
          </Button>

          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={() => navigate("/dashboard")}
            sx={{ mb: 1 }}
          >
            Skip for Now
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default ProfileSetup;