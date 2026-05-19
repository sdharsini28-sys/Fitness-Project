import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Grid,
  Modal,
  IconButton,
  Pagination,
  Tabs,
  Tab,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  Search,
  Favorite,
  FavoriteBorder,
  PlayArrow,
  Close,
  FilterList,
  ExpandMore,
  AccessTime,
  LocalFireDepartment,
  FitnessCenter,
} from "@mui/icons-material";
import API from "../services/api";

const Exercise = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filters, setFilters] = useState({
    muscleGroup: "",
    difficulty: "",
    equipment: "",
  });
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const exercisesPerPage = 12;

  const categories = [
    { value: "all", label: "All Exercises", icon: "🏋️" },
    { value: "chest", label: "Chest", icon: "💪" },
    { value: "legs", label: "Legs", icon: "🦵" },
    { value: "cardio", label: "Cardio", icon: "❤️" },
    { value: "yoga", label: "Yoga", icon: "🧘" },
  ];

  const muscleGroups = ["Chest", "Back", "Shoulders", "Arms", "Legs", "Core", "Full Body"];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];
  const equipmentOptions = ["None", "Dumbbells", "Barbell", "Resistance Bands", "Kettlebell", "Pull-up Bar"];

  const loadExercises = useCallback(async () => {
    try {
      // In a real app, this would be an API call
      // const response = await API.get("/exercises");
      // setExercises(response.data);

      // Mock data for demonstration
      const mockExercises = [
        {
          id: 1,
          name: "Push-ups",
          category: "chest",
          muscleGroup: "Chest",
          difficulty: "Beginner",
          equipment: "None",
          description: "A classic bodyweight exercise that targets the chest, shoulders, and triceps.",
          instructions: "Start in a plank position with hands shoulder-width apart. Lower your body until your chest nearly touches the floor, then push back up.",
          duration: 10,
          caloriesBurn: 50,
          gifUrl: "https://media.giphy.com/media/3o7TKz9bX9Z9Z9Z9/giphy.gif",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          targetMuscles: ["Chest", "Shoulders", "Triceps"],
        },
        {
          id: 2,
          name: "Squats",
          category: "legs",
          muscleGroup: "Legs",
          difficulty: "Beginner",
          equipment: "None",
          description: "A fundamental lower body exercise that targets the quadriceps, hamstrings, and glutes.",
          instructions: "Stand with feet shoulder-width apart. Lower your body as if sitting back into a chair, then stand back up.",
          duration: 15,
          caloriesBurn: 75,
          gifUrl: "https://media.giphy.com/media/3o7TKz9bX9Z9Z9Z9Z9/giphy.gif",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          targetMuscles: ["Quadriceps", "Hamstrings", "Glutes"],
        },
        {
          id: 3,
          name: "Running",
          category: "cardio",
          muscleGroup: "Full Body",
          difficulty: "Intermediate",
          equipment: "None",
          description: "An excellent cardiovascular exercise that improves heart health and endurance.",
          instructions: "Find a safe running path. Start with a warm-up walk, then gradually increase to a jog or run.",
          duration: 30,
          caloriesBurn: 300,
          gifUrl: "https://media.giphy.com/media/3o7TKz9bX9Z9Z9Z9Z9/giphy.gif",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          targetMuscles: ["Legs", "Core", "Cardiovascular System"],
        },
        {
          id: 4,
          name: "Downward Dog",
          category: "yoga",
          muscleGroup: "Full Body",
          difficulty: "Beginner",
          equipment: "None",
          description: "A foundational yoga pose that stretches the entire body and builds strength.",
          instructions: "Start on all fours. Lift your hips up and back, forming an inverted V shape with your body.",
          duration: 20,
          caloriesBurn: 30,
          gifUrl: "https://media.giphy.com/media/3o7TKz9bX9Z9Z9Z9Z9/giphy.gif",
          videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
          targetMuscles: ["Hamstrings", "Shoulders", "Core"],
        },
        // Add more mock exercises as needed
      ];

      setExercises(mockExercises);
      setLoading(false);
    } catch (error) {
      console.error("Error loading exercises:", error);
      setLoading(false);
    }
  }, []);

  const loadFavorites = useCallback(() => {
    const savedFavorites = localStorage.getItem("favoriteExercises");
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  const saveFavorites = useCallback((newFavorites) => {
    localStorage.setItem("favoriteExercises", JSON.stringify([...newFavorites]));
  }, []);

  const handleCategoryChange = (event, newValue) => {
    setSelectedCategory(newValue);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  const toggleFavorite = (exerciseId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(exerciseId)) {
      newFavorites.delete(exerciseId);
    } else {
      newFavorites.add(exerciseId);
    }
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const openExerciseModal = (exercise) => {
    setSelectedExercise(exercise);
  };

  const closeExerciseModal = () => {
    setSelectedExercise(null);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const paginatedExercises = filteredExercises.slice(
    (currentPage - 1) * exercisesPerPage,
    currentPage * exercisesPerPage
  );

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner": return "success";
      case "Intermediate": return "warning";
      case "Advanced": return "error";
      default: return "default";
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      await loadExercises();
      loadFavorites();
    };
    initializeData();
  }, [loadExercises, loadFavorites]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredExercises(() => {
      let filtered = exercises;

      // Filter by category
      if (selectedCategory !== "all") {
        filtered = filtered.filter(exercise => exercise.category === selectedCategory);
      }

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(exercise =>
          exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply additional filters
      if (filters.muscleGroup) {
        filtered = filtered.filter(exercise => exercise.muscleGroup === filters.muscleGroup);
      }
      if (filters.difficulty) {
        filtered = filtered.filter(exercise => exercise.difficulty === filters.difficulty);
      }
      if (filters.equipment) {
        filtered = filtered.filter(exercise => exercise.equipment === filters.equipment);
      }

      return filtered;
    });
    setCurrentPage(1);
  }, [exercises, searchTerm, selectedCategory, filters]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <Typography>Loading exercises...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
          Exercise Library
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Discover and save your favorite workouts
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 3, mx: { xs: 2, md: 4 } }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              onClick={() => setShowFilters(!showFilters)}
              sx={{ mr: 2 }}
            >
              Filters
            </Button>
            <Typography variant="body2" color="text.secondary" component="span">
              {filteredExercises.length} exercises found
            </Typography>
          </Grid>
        </Grid>

        {/* Advanced Filters */}
        {showFilters && (
          <Box sx={{ mt: 3, p: 2, bgcolor: "#f9f9f9", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Advanced Filters
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="muscle-group-label">Muscle Group</InputLabel>
                  <Select
                    labelId="muscle-group-label"
                    id="muscle-group-select"
                    value={filters.muscleGroup}
                    label="Muscle Group"
                    onChange={(e) => handleFilterChange("muscleGroup", e.target.value)}
                    renderValue={(selected) => selected || "All"}
                    MenuProps={{ PaperProps: { style: { minWidth: 240 } } }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {muscleGroups.map(group => (
                      <MenuItem key={group} value={group}>{group}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="difficulty-label">Difficulty</InputLabel>
                  <Select
                    labelId="difficulty-label"
                    id="difficulty-select"
                    value={filters.difficulty}
                    label="Difficulty"
                    onChange={(e) => handleFilterChange("difficulty", e.target.value)}
                    renderValue={(selected) => selected || "All"}
                    MenuProps={{ PaperProps: { style: { minWidth: 240 } } }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {difficulties.map(diff => (
                      <MenuItem key={diff} value={diff}>{diff}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="equipment-label">Equipment</InputLabel>
                  <Select
                    labelId="equipment-label"
                    id="equipment-select"
                    value={filters.equipment}
                    label="Equipment"
                    onChange={(e) => handleFilterChange("equipment", e.target.value)}
                    renderValue={(selected) => selected || "All"}
                    MenuProps={{ PaperProps: { style: { minWidth: 240 } } }}
                  >
                    <MenuItem value="">All</MenuItem>
                    {equipmentOptions.map(equip => (
                      <MenuItem key={equip} value={equip}>{equip}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Category Tabs */}
      <Box sx={{ mx: { xs: 2, md: 4 }, mb: 3 }}>
        <Tabs
          value={selectedCategory}
          onChange={handleCategoryChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              minHeight: 60,
              textTransform: "none",
              fontSize: "1rem",
            },
          }}
        >
          {categories.map(category => (
            <Tab
              key={category.value}
              value={category.value}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h6">{category.icon}</Typography>
                  <Typography>{category.label}</Typography>
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      {/* Exercise Grid */}
      <Box sx={{ mx: { xs: 2, md: 4 } }}>
        <Grid container spacing={3}>
          {paginatedExercises.map(exercise => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={exercise.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-4px)" },
                }}
                onClick={() => openExerciseModal(exercise)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={exercise.gifUrl}
                  alt={exercise.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }}>
                      {exercise.name}
                    </Typography>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(exercise.id);
                      }}
                      sx={{ p: 0 }}
                    >
                      {favorites.has(exercise.id) ? (
                        <Favorite sx={{ color: "error.main" }} />
                      ) : (
                        <FavoriteBorder />
                      )}
                    </IconButton>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={exercise.difficulty}
                      color={getDifficultyColor(exercise.difficulty)}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                    <Chip
                      label={exercise.equipment}
                      variant="outlined"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {exercise.muscleGroup}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <AccessTime sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      {exercise.duration} min
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocalFireDepartment sx={{ fontSize: 16, color: "error.main" }} />
                    <Typography variant="body2" color="text.secondary">
                      {exercise.caloriesBurn} cal
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        {filteredExercises.length > exercisesPerPage && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={Math.ceil(filteredExercises.length / exercisesPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        )}

        {/* No Results */}
        {filteredExercises.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <FitnessCenter sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No exercises found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </Box>
        )}
      </Box>

      {/* Exercise Detail Modal */}
      <Dialog
        open={!!selectedExercise}
        onClose={closeExerciseModal}
        maxWidth="md"
        fullWidth
      >
        {selectedExercise && (
          <>
            <DialogTitle sx={{ pb: 1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h5" component="div">
                  {selectedExercise.name}
                </Typography>
                <IconButton onClick={closeExerciseModal}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ position: "relative" }}>
                    {selectedExercise.videoUrl ? (
                      <video
                        controls
                        poster={selectedExercise.gifUrl}
                        style={{
                          width: "100%",
                          borderRadius: 16,
                          maxHeight: 320,
                          objectFit: "cover",
                        }}
                      >
                        <source src={selectedExercise.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <CardMedia
                        component="img"
                        height="300"
                        image={selectedExercise.gifUrl}
                        alt={selectedExercise.name}
                        sx={{ borderRadius: 2, objectFit: "cover" }}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={selectedExercise.difficulty}
                      color={getDifficultyColor(selectedExercise.difficulty)}
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={selectedExercise.equipment}
                      variant="outlined"
                    />
                  </Box>

                  <Typography variant="h6" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedExercise.description}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Instructions
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {selectedExercise.instructions}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Target Muscles
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {selectedExercise.targetMuscles.map(muscle => (
                      <Chip key={muscle} label={muscle} size="small" sx={{ mr: 1, mb: 1 }} />
                    ))}
                  </Box>

                  <Box sx={{ display: "flex", gap: 3, mt: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTime color="action" />
                      <Typography variant="body2">
                        {selectedExercise.duration} minutes
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocalFireDepartment color="error" />
                      <Typography variant="body2">
                        {selectedExercise.caloriesBurn} calories
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeExerciseModal}>Close</Button>
              <Button
                variant="contained"
                startIcon={favorites.has(selectedExercise.id) ? <Favorite /> : <FavoriteBorder />}
                onClick={() => toggleFavorite(selectedExercise.id)}
              >
                {favorites.has(selectedExercise.id) ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Exercise;