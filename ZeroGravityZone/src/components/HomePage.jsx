import React from "react";
import NavBar from "./NavBar.jsx";
import HeroSection from "./HeroSection.jsx";
import { Box } from "@mui/material";
import Posts from "./Posts.jsx";

function HomePage() {
  return (
    <Box>
      {" "}
      <NavBar />
      <Posts />
    </Box>
  );
}

export default HomePage;
