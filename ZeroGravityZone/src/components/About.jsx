import React from "react";
import { Box, Typography, Container } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/night-sky-Milky-Way-Galaxy.webp"; // Import the image

function About() {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        width: "98vw",
        height: "97vh",
        backgroundImage: `url(${backgroundImage})`, // Use the imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
      maxWidth={false}
    >
      <ArrowBackIcon
        sx={{ color: "white", fontSize: 100, cursor: "pointer", position: "absolute", top: 20, left: 20 }}
        onClick={() => navigate(-1)}
      />

      {/* Content */}
      <Box
        sx={{
          zIndex: 2,
          maxWidth: "800px",
          textAlign: "center",
          p: 4,
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
