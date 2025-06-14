import React from "react";
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
  CircularProgress,
} from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import OrbBackground from "./OrbBackground.jsx";

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      try {
        // Check if user exists
        const checkResponse = await axios.get("http://localhost:3000/profile", {
          params: { email: values.email, password: values.password },
        });

        if (checkResponse.data.length === 0) {
          throw new Error("Invalid email or password");
        }

        const userData = checkResponse.data[0];
        login(userData); // Update auth context

        if (values.remember) {
          localStorage.setItem("user", JSON.stringify(userData));
        }
        
        navigate(`/profile/${userData.id}`);
      } catch (err) {
        console.error("Login error:", err);
        setError(err.response?.data?.message || err.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        backgroundImage: `url('./src/assets/placeholder.webp')`,
        backgroundSize: "Cover",
        backgroundPosition: "center",
        minHeight: "95vh",
        py: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <OrbBackground 
        hoverIntensity={0.5}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
        title="ZeroGravityZone"
      />
      <Typography variant="h5" align="center" sx={{ color: "white", mb: 2 }}>
        <RocketLaunchIcon /> ZeroGravityZone <RocketLaunchIcon />
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h6" align="center" sx={{ mb: 3 }}>
            Welcome back to ZeroGravityZone
          </Typography>

          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              autoComplete="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 2 }}
            />
            
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ mb: 2 }}
            />
            
            <FormControlLabel
              control={
                <Checkbox
                  name="remember"
                  color="primary"
                  checked={formik.values.remember}
                  onChange={formik.handleChange}
                />
              }
              label="Remember me"
              sx={{ mb: 2 }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, py: 1.5 }}
              disabled={loading || !formik.isValid}
            >
              {loading ? <CircularProgress size={24} /> : "LOGIN"}
            </Button>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Typography variant="body2" align="center">
              Don't have an account?{" "}
              <Link href="/signup" underline="hover">
                Sign up
              </Link>
            </Typography>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;