import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SportsIcon from "@mui/icons-material/Sports";


const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return !!token;
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FitLife
        </Typography>

        <Button color="inherit" component={Link} to="/"><HomeIcon /></Button>
        <Button color="inherit" component={Link} to="/exercise"><FitnessCenterIcon /></Button>
        <Button color="inherit" component={Link} to="/diet"><RestaurantIcon /></Button>

        {/* 🔥 NEW FEATURES */}
        {isLoggedIn && (
          <>
            <Button color="inherit" component={Link} to="/dashboard"><DashboardIcon /></Button>
            <Button color="inherit" component={Link} to="/workout"><SportsIcon /></Button>
          </>
        )}

        {!isLoggedIn ? (
          <>
            
            <Button color="inherit" component={Link} to="/registration"><PersonAddIcon /></Button>
          </>
        ) : (
          <>
            <IconButton color="inherit" onClick={handleProfileMenu}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { navigate("/profile-setup"); handleClose(); }}>
                Profile Setup
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;