import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Exercise from "./pages/Exercise";
import DietPlan from "./pages/DietPlan";
import About from "./pages/About";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        {/* Exercise page now includes WorkoutProgress */}
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

      </Routes>

      <Footer />
    </Router>
  );
};

export default App;