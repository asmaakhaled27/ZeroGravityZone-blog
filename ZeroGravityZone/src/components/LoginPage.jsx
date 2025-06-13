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
} from "@mui/material";
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://localhost:3000/profile', {
        params: { email, password }
      });

      if (response.data.length > 0) {
        console.log('Login successful');
    
        if (remember) {
          localStorage.setItem('user', JSON.stringify(response.data[0]));
        }
      navigate(`/profile/${response.data[0].id}`);

      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong. Please try again.');
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
            >
              LOGIN
            </Button>

            {error && (
              <Typography color="error" align="center" sx={{ mb: 1 }}>
                {error}
              </Typography>
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
