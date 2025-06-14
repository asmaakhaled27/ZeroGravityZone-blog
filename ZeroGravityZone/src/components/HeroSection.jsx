import React from "react";
import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import Navbar from "./NavBar";
import OrbBackground from "../Animation/OrbBackground";


const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: "url('/src/assets/night-sky-Milky-Way-Galaxy.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 3,
        }}
      >
        <Box>
          <OrbBackground
            hoverIntensity={0.5}
            rotateOnHover={true}
            hue={0}
            forceHoverState={false}
            title="ZeroGravityZone"
            
          />
          <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
            Welcome to ZeroGravityZone
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            A community for space nerds to share sky pics, celestial events, and
            cosmic vibes.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={() => navigate("/signup")}
              startIcon={<RocketLaunchIcon />}
            >
              Join Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="inherit"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </Stack>
        </Box>
     


      </Box>
    </Container>
  );
};

export default HeroSection;
