import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // First check if user exists
      const checkResponse = await axios.get("http://localhost:3000/profile", {
        params: { email, password },
      });

      if (checkResponse.data.length === 0) {
        throw new Error("Invalid email or password");
      }

      const userData = checkResponse.data[0];
      
      // If using JWT or session-based auth, you would call your auth endpoint here
      // const authResponse = await axios.post("/api/auth/login", { email, password });
      
      login(userData); // Update auth context

      if (remember) {
        localStorage.setItem("user", JSON.stringify(userData));
      }
      
      navigate(`/profile/${userData.id}`);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography variant="h5" align="center" sx={{ mt: 4 }}>
        <RocketLaunchIcon /> ZeroGravityZone <RocketLaunchIcon />
      </Typography>

      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" align="center" sx={{ mt: 2 }}>
            Welcome back to ZeroGravityZone, space waiting for you
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  color="primary"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
              }
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading}
            >
              {loading ? "Signing in..." : "LOGIN"}
            </Button>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Link href="#" variant="body2" display="block" align="center">
              Forgot password?
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;