import React from "react";
import NavBar from "./NavBar.jsx";
import HeroSection from "./HeroSection.jsx";
import { Box } from "@mui/material";

function HomePage() {
  return (
    <Box>
      {" "}
      <NavBar />
      <HeroSection />
    </Box>
  );
}

export default HomePage;
