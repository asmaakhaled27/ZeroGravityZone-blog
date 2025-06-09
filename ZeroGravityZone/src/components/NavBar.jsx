import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const navLinks = [
    { label: "Blog", path: "/" },
    { label: "About", path: "/about" },
  ];

  return (
    <AppBar position="static" color="default" elevation={2}>
      <Toolbar>
        <RocketLaunchIcon sx={{ mr: 1, color: "primary.main" }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ZeroGravityZone
        </Typography>

        {/* Desktop Navigation Links */}
        {!isMobile && (
          <Stack direction="row" spacing={2}>
            {navLinks.map((link) => (
              <Button
                key={link.label}
                color="inherit"
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </Button>
            ))}
          </Stack>
        )}

        {/* Auth Buttons */}
        <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
          <Button color="primary" variant="outlined" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button color="primary" variant="contained"  onClick={() => navigate("/Signup")}>
            Sign Up
          </Button>
        </Box>

        {/* Mobile Menu Icon */}
        {isMobile && (
          <IconButton edge="end" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
