import React from "react";
import { Box, Typography, Container } from "@mui/material";

function About() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: "98vw",
        height: "97vh",
        backgroundImage: "url(../src/assets/night-sky-Milky-Way-Galaxy.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Overlay for better readability */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
            // backgroundImage: "url(../assets/night-sky-Milky-Way-Galaxy.webp)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Box
        sx={{
          zIndex: 2,
          color: "white",
        //   p: 4,
          maxWidth: "800px",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" gutterBottom>
          About <span style={{ color: "#90caf9" }}>ZeroGravityZone</span>
        </Typography>
        <Typography variant="body1" fontSize={20} lineHeight={1.8}>
          ZeroGravityZone is a vibrant online community built for space
          enthusiasts, stargazers, and astronomy lovers. Think of it as the
          Facebook for space nerds a place where users can connect, share
          breathtaking images of the night sky, post real-time updates about
          celestial events, and engage with others who are passionate about the
          cosmos. Whether you’re tracking a meteor shower, capturing a stunning
          nebula, or simply curious about what’s happening in the sky tonight,
          ZeroGravityZone is your go-to platform to explore, share, and
          celebrate the wonders of the universe together.
        </Typography>
      </Box>
    </Container>
  );
}

export default About;
