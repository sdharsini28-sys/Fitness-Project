import React, { useEffect, useMemo, useState } from "react";
import API from "../services/api";

function Workout() {
  const [workouts, setWorkouts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    duration: "",
    calories: "",
    sets: "",
    reps: "",
    notes: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [restSeconds, setRestSeconds] = useState(60);
  const [restRunning, setRestRunning] = useState(false);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  useEffect(() => {
    let interval;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  useEffect(() => {
    let interval;
    if (restRunning) {
      interval = setInterval(() => {
        setRestSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [restRunning]);

  useEffect(() => {
    if (restSeconds === 0 && restRunning) {
      setRestRunning(false);
    }
  }, [restSeconds, restRunning]);

  const fetchWorkouts = async () => {
    try {
      const res = await API.get("/workouts");
      setWorkouts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const newWorkout = {
      name: form.name,
      duration: Number(form.duration),
      calories: Number(form.calories),
      sets: form.sets ? Number(form.sets) : null,
      reps: form.reps ? Number(form.reps) : null,
      notes: form.notes,
      date: new Date().toISOString(),
    };

    try {
      await API.post("/workouts", newWorkout);
      setWorkouts((prev) => [newWorkout, ...prev]);
      setForm({ name: "", duration: "", calories: "", sets: "", reps: "", notes: "" });
    } catch (err) {
      console.log(err);
      setWorkouts((prev) => [newWorkout, ...prev]);
      setForm({ name: "", duration: "", calories: "", sets: "", reps: "", notes: "" });
    } finally {
      setSubmitting(false);
    }
  };

  const formatSeconds = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const workoutRecords = useMemo(() => {
    return workouts
      .map((w) => ({
        ...w,
        dateObject: w.date ? new Date(w.date) : new Date(),
      }))
      .sort((a, b) => b.dateObject - a.dateObject);
  }, [workouts]);

  const totalWorkouts = workoutRecords.length;
  const totalCalories = workoutRecords.reduce((sum, w) => sum + Number(w.calories || 0), 0);
  const totalDuration = workoutRecords.reduce((sum, w) => sum + Number(w.duration || 0), 0);
  const maxDuration = workoutRecords.reduce((max, w) => Math.max(max, Number(w.duration || 0)), 0);
  const maxCalories = workoutRecords.reduce((max, w) => Math.max(max, Number(w.calories || 0)), 0);

  const exerciseCounts = workoutRecords.reduce((acc, w) => {
    if (!w.name) return acc;
    acc[w.name] = (acc[w.name] || 0) + 1;
    return acc;
  }, {});
  const favoriteExercise = Object.entries(exerciseCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  const calendarDays = useMemo(() => {
    const days = Array.from({ length: 7 }).map((_, idx) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - idx));
      const dateStr = date.toDateString();
      const dayWorkouts = workoutRecords.filter((w) => w.dateObject.toDateString() === dateStr);
      return {
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
        dateLabel: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        count: dayWorkouts.length,
        duration: dayWorkouts.reduce((sum, w) => sum + Number(w.duration || 0), 0),
        calories: dayWorkouts.reduce((sum, w) => sum + Number(w.calories || 0), 0),
      };
    });
    return days;
  }, [workoutRecords]);

  const weeklyTarget = 4;
  const workoutsThisWeek = calendarDays.reduce((sum, item) => sum + item.count, 0);
  const weeklyProgress = Math.min(100, Math.round((workoutsThisWeek / weeklyTarget) * 100));

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#333" }}>Workout Tracker</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#007bff" }}>Workout Timer</h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <span style={{ fontSize: "2rem", fontWeight: "bold" }}>{formatSeconds(timerSeconds)}</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setTimerRunning((prev) => !prev)}
                style={{ padding: "10px 15px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: "#007bff", color: "white" }}
              >
                {timerRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(0);
                }}
                style={{ padding: "10px 15px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: "#6c757d", color: "white" }}
              >
                Reset
              </button>
            </div>
          </div>

          <h2 style={{ marginBottom: "20px", color: "#28a745" }}>Rest Timer</h2>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <span style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#28a745" }}>{formatSeconds(restSeconds)}</span>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => setRestRunning(true)}
                disabled={restSeconds === 0}
                style={{ padding: "10px 15px", borderRadius: "6px", border: "none", cursor: restSeconds === 0 ? "not-allowed" : "pointer", backgroundColor: "#28a745", color: "white" }}
              >
                Start Rest
              </button>
              <button
                onClick={() => {
                  setRestRunning(false);
                  setRestSeconds(60);
                }}
                style={{ padding: "10px 15px", borderRadius: "6px", border: "none", cursor: "pointer", backgroundColor: "#6c757d", color: "white" }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#f8f9fa",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#6610f2" }}>Weekly Progress</h2>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "15px" }}>
            <div>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{workoutsThisWeek}</div>
              <div style={{ color: "#666" }}>Workouts this week</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "2rem", fontWeight: "bold" }}>{weeklyProgress}%</div>
              <div style={{ color: "#666" }}>Goal completion</div>
            </div>
          </div>
          <div style={{ backgroundColor: "#e9ecef", borderRadius: "999px", height: "16px", overflow: "hidden" }}>
            <div style={{ width: `${weeklyProgress}%`, height: "100%", backgroundColor: "#6610f2" }} />
          </div>

          <h3 style={{ marginTop: "30px", marginBottom: "15px", color: "#333" }}>Personal Records</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", border: "1px solid #ddd" }}>
              <div style={{ color: "#666", marginBottom: "8px" }}>Longest Session</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>{maxDuration} min</div>
            </div>
            <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", border: "1px solid #ddd" }}>
              <div style={{ color: "#666", marginBottom: "8px" }}>Max Calories</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>{maxCalories} kcal</div>
            </div>
            <div style={{ backgroundColor: "white", padding: "15px", borderRadius: "8px", border: "1px solid #ddd", gridColumn: "span 2" }}>
              <div style={{ color: "#666", marginBottom: "8px" }}>Favorite Exercise</div>
              <div style={{ fontSize: "1.5rem", fontWeight: "700" }}>{favoriteExercise}</div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#f8f9fa",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "40px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#007bff" }}>Add New Workout</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
          <div style={{ gridColumn: "span 2" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Exercise Name:</label>
            <input
              type="text"
              placeholder="e.g., Running"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Duration (minutes):</label>
            <input
              type="number"
              placeholder="e.g., 30"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              required
              min="1"
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Calories Burned:</label>
            <input
              type="number"
              placeholder="e.g., 200"
              value={form.calories}
              onChange={(e) => setForm({ ...form, calories: e.target.value })}
              required
              min="0"
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Sets:</label>
            <input
              type="number"
              placeholder="e.g., 4"
              value={form.sets}
              onChange={(e) => setForm({ ...form, sets: e.target.value })}
              min="1"
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Reps per Set:</label>
            <input
              type="number"
              placeholder="e.g., 12"
              value={form.reps}
              onChange={(e) => setForm({ ...form, reps: e.target.value })}
              min="1"
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px" }}
            />
          </div>

          <div style={{ gridColumn: "span 2" }}>
            <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Notes:</label>
            <textarea
              placeholder="Add performance notes, how you felt, or intensity details..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={4}
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "16px", resize: "vertical" }}
            />
          </div>

          <div style={{ gridColumn: "span 2", textAlign: "right" }}>
            <button
              type="submit"
              disabled={submitting}
              style={{
                padding: "12px 24px",
                backgroundColor: submitting ? "#ccc" : "#28a745",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                cursor: submitting ? "not-allowed" : "pointer",
              }}
            >
              {submitting ? "Adding..." : "Add Workout"}
            </button>
          </div>
        </form>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Workout Calendar</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "14px" }}>
          {calendarDays.map((day) => (
            <div
              key={day.label}
              style={{
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: day.count ? "#fff" : "#f1f3f5",
                border: "1px solid #ddd",
                minHeight: "120px",
              }}
            >
              <div style={{ fontWeight: "700", marginBottom: "6px" }}>{day.label}</div>
              <div style={{ color: "#666", marginBottom: "12px" }}>{day.dateLabel}</div>
              <div style={{ fontSize: "1.25rem", fontWeight: "700" }}>{day.count}</div>
              <div style={{ color: "#666", fontSize: "0.95rem" }}>sessions</div>
              <div style={{ marginTop: "8px", color: "#333" }}>{day.duration} min</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Workout History</h2>
        {loading ? (
          <p>Loading workouts...</p>
        ) : workoutRecords.length === 0 ? (
          <p>No workouts logged yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px" }}>
            {workoutRecords.map((w, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "18px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", color: "#007bff" }}>{w.name || "Unnamed Workout"}</h3>
                <div style={{ color: "#666", marginBottom: "10px" }}>{formatDate(w.date || new Date().toISOString())}</div>
                <p style={{ margin: "5px 0", color: "#333" }}><strong>Duration:</strong> {w.duration || 0} min</p>
                <p style={{ margin: "5px 0", color: "#333" }}><strong>Calories:</strong> {w.calories || 0} kcal</p>
                {w.sets ? <p style={{ margin: "5px 0", color: "#333" }}><strong>Sets:</strong> {w.sets}</p> : null}
                {w.reps ? <p style={{ margin: "5px 0", color: "#333" }}><strong>Reps:</strong> {w.reps}</p> : null}
                {w.notes ? (
                  <div style={{ marginTop: "12px", padding: "12px", backgroundColor: "#f1f3f5", borderRadius: "6px" }}>
                    <strong style={{ display: "block", marginBottom: "6px" }}>Notes</strong>
                    <p style={{ margin: 0, color: "#444" }}>{w.notes}</p>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Workout;
