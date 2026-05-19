import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FitLife 
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/registration">Register</Button>
        <Button color="inherit" component={Link} to="/exercise">Exercise</Button>
        <Button color="inherit" component={Link} to="/diet">Diet Plan</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
