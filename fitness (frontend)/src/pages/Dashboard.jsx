import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Bar, Line } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import API from "../services/api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const sampleProfile = {
  name: "Alex Morgan",
  role: "Fitness Enthusiast",
  goal: "Lean Strength",
  level: "Intermediate",
  completedGoals: 72,
  streakTarget: 7,
  avatar: "https://i.pravatar.cc/120?img=32",
};

const achievementBadges = [
  { label: "First Workout", active: true },
  { label: "7-Day Streak", active: true },
  { label: "1000 kcal Burned", active: true },
  { label: "Weekly Goal", active: false },
  { label: "10 Workouts", active: true },
];

const fallbackWorkouts = [
  { id: 1, type: "Strength", title: "Upper Body Blast", calories: 420, duration: 45, date: new Date(Date.now() - 86400000 * 1).toISOString(), notes: "Heavy compound lifts" },
  { id: 2, type: "Cardio", title: "Morning Run", calories: 350, duration: 30, date: new Date(Date.now() - 86400000 * 2).toISOString(), notes: "Interval pace work" },
  { id: 3, type: "Yoga", title: "Recovery Flow", calories: 180, duration: 40, date: new Date(Date.now() - 86400000 * 3).toISOString(), notes: "Mobility and breathing" },
  { id: 4, type: "Strength", title: "Leg Day", calories: 510, duration: 55, date: new Date(Date.now() - 86400000 * 4).toISOString(), notes: "Squats and deadlifts" },
  { id: 5, type: "Cardio", title: "HIIT Session", calories: 430, duration: 25, date: new Date(Date.now() - 86400000 * 5).toISOString(), notes: "Tabata-style bursts" },
  { id: 6, type: "Stretch", title: "Evening Mobility", calories: 120, duration: 20, date: new Date(Date.now() - 86400000 * 6).toISOString(), notes: "Joint release" },
  { id: 7, type: "Strength", title: "Core & Conditioning", calories: 300, duration: 35, date: new Date(Date.now() - 86400000 * 7).toISOString(), notes: "Core circuits" },
];

const weightHistory = [
  { week: "Week 1", value: 78 },
  { week: "Week 2", value: 77.4 },
  { week: "Week 3", value: 77 },
  { week: "Week 4", value: 76.6 },
  { week: "Week 5", value: 76.1 },
  { week: "Week 6", value: 75.8 },
];

const formatDay = (dateString) => new Date(dateString).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

const getLast7Days = () => {
  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return date;
  });
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const [profile] = useState(sampleProfile);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/workouts");
        const data = Array.isArray(res.data) ? res.data : res.data.workouts || [];
        setWorkouts(data.length ? data : fallbackWorkouts);
      } catch (err) {
        console.error(err);
        setWorkouts(fallbackWorkouts);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const workoutRecords = useMemo(() => {
    return workouts
      .map((item) => ({
        ...item,
        dateObject: item.date ? new Date(item.date) : new Date(),
      }))
      .sort((a, b) => b.dateObject - a.dateObject);
  }, [workouts]);

  const totalWorkouts = workoutRecords.length;
  const totalCalories = workoutRecords.reduce((sum, workout) => sum + Number(workout.calories || 0), 0);
  const totalDuration = workoutRecords.reduce((sum, workout) => sum + Number(workout.duration || 0), 0);

  const recentWorkouts = workoutRecords.slice(0, 5);

  const workoutsByDay = useMemo(() => {
    const days = getLast7Days();
    return days.map((day) => {
      const label = day.toLocaleDateString("en-US", { weekday: "short" });
      const count = workoutRecords.filter((w) => w.dateObject.toDateString() === day.toDateString()).length;
      const calories = workoutRecords
        .filter((w) => w.dateObject.toDateString() === day.toDateString())
        .reduce((sum, w) => sum + Number(w.calories || 0), 0);
      return { label, count, calories };
    });
  }, [workoutRecords]);

  const streakCount = useMemo(() => {
    const workoutDays = new Set(workoutRecords.map((w) => w.dateObject.toDateString()));
    let streak = 0;
    let current = new Date();
    while (workoutDays.has(current.toDateString())) {
      streak += 1;
      current.setDate(current.getDate() - 1);
    }
    return streak;
  }, [workoutRecords]);

  const weeklyTarget = 5;
  const workoutsThisWeek = workoutsByDay.reduce((sum, item) => sum + item.count, 0);
  const goalCompletion = Math.min(100, Math.round((workoutsThisWeek / weeklyTarget) * 100));

  const weeklyCalories = workoutRecords
    .filter((w) => getLast7Days().some((day) => day.toDateString() === w.dateObject.toDateString()))
    .reduce((sum, w) => sum + Number(w.calories || 0), 0);

  const averageWorkout = totalWorkouts ? Math.round(totalDuration / totalWorkouts) : 0;

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5">Loading Dashboard...</Typography>
      </Box>
    );
  }

  const weightChartData = {
    labels: weightHistory.map((item) => item.week),
    datasets: [
      {
        label: "Weight (kg)",
        data: weightHistory.map((item) => item.value),
        borderColor: "#3f51b5",
        backgroundColor: "rgba(63,81,181,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const caloriesChartData = {
    labels: workoutsByDay.map((item) => item.label),
    datasets: [
      {
        label: "Calories Burned",
        data: workoutsByDay.map((item) => item.calories),
        backgroundColor: "rgba(255,99,132,0.6)",
      },
    ],
  };

  const caloriesChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Weekly Calories" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  const weightChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: "Weight Progress" },
    },
    scales: {
      y: { beginAtZero: false },
    },
  };

  return (
    <Box sx={{ p: 4, maxWidth: "1300px", mx: "auto" }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: "center" }}>
        Fitness Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2, height: "100%" }}>
            <CardContent>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Avatar alt={profile.name} src={profile.avatar} sx={{ width: 64, height: 64 }} />
                <Box>
                  <Typography variant="h6">{profile.name}</Typography>
                  <Typography color="text.secondary">{profile.role}</Typography>
                </Box>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" sx={{ mb: 1 }}>
                Current goal: <strong>{profile.goal}</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Level: <strong>{profile.level}</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Weekly target: <strong>{weeklyTarget} workouts</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Daily streak: <strong>{streakCount} days</strong>
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Completed goals: <strong>{profile.completedGoals}%</strong>
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Goal completion
                </Typography>
                <LinearProgress variant="determinate" value={goalCompletion} sx={{ mt: 1, height: 10, borderRadius: 5 }} />
                <Typography variant="caption" color="text.secondary">
                  {goalCompletion}% of this week�s goal
                </Typography>
              </Box>
            </CardContent>
          </Card>

          <Card sx={{ p: 2, mt: 3 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Achievement Badges
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {achievementBadges.map((badge) => (
                  <Chip
                    key={badge.label}
                    label={badge.label}
                    color={badge.active ? "primary" : "default"}
                    variant={badge.active ? "filled" : "outlined"}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ p: 2, height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Workout Summary
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {totalWorkouts}
                  </Typography>
                  <Typography color="text.secondary">Total workouts completed</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ p: 2, height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Calories Burned
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {totalCalories}
                  </Typography>
                  <Typography color="text.secondary">Total calories burned</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ p: 2, height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Average Duration
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {averageWorkout} min
                  </Typography>
                  <Typography color="text.secondary">Per workout session</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{ p: 2, height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Weekly Burn
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 1 }}>
                    {weeklyCalories}
                  </Typography>
                  <Typography color="text.secondary">Calories this week</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: "100%" }}>
            <CardContent>
              <Line data={weightChartData} options={weightChartOptions} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: "100%" }}>
            <CardContent>
              <Bar data={caloriesChartData} options={caloriesChartOptions} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Activity Timeline
              </Typography>
              <List>
                {recentWorkouts.slice(0, 5).map((workout) => (
                  <React.Fragment key={workout.id}>
                    <ListItem alignItems="flex-start" sx={{ p: 0, mb: 1 }}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "primary.main" }}>{workout.type.charAt(0)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={workout.title}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {formatDay(workout.date)} • {workout.type}
                            </Typography>
                            {` • ${workout.calories} kcal, ${workout.duration} min`}
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2, height: "100%" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Recent Workouts
              </Typography>
              <Stack spacing={2}>
                {recentWorkouts.map((workout) => (
                  <Paper key={workout.id} variant="outlined" sx={{ p: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {workout.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatDay(workout.date)} • {workout.type}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      {workout.calories} kcal • {workout.duration} min
                    </Typography>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
