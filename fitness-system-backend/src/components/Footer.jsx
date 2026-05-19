import React from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        mt: 5,
        py: 3,
        px: 2,
        bgcolor: "primary.main",
        color: "white",
        textAlign: "center",
      }}
    >
      <Typography variant="body1">
        &copy; {new Date().getFullYear()} Fitness System. All rights reserved.
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        <Link href="/" color="inherit" underline="hover">
          Home
        </Link>{" "}
        |{" "}
        <Link href="/about" color="inherit" underline="hover">
          About
        </Link>{" "}
        
      </Typography>
    </Box>
  );
};

export default Footer;