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
import OrbBackground from "../Animation/OrbBackground.jsx";

const SignupPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Validation Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Full name is required")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    agreeTerms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      try {
        // Check if email exists
        const checkResponse = await axios.get("http://localhost:3000/profile", {
          params: { email: values.email },
        });

        if (checkResponse.data.length > 0) {
          throw new Error("Email already exists");
        }

        // Create new user
        const newUser = {
          name: values.name,
          email: values.email,
          password: values.password, // Note: Hash passwords in production
          id: Date.now(), // Temporary ID - backend should generate this
        };

        const response = await axios.post(
          "http://localhost:3000/profile",
          newUser
        );
        console.log(response.data);
        // Log the user in
        login(newUser);

        if (values.agreeTerms) {
          localStorage.setItem("user", JSON.stringify(newUser));
        }

        navigate(`/profile/${newUser.id}`);
      } catch (err) {
        console.error("Signup error:", err);
        setError(err.response?.data?.message || err.message || "Signup failed");
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
        backgroundSize: "cover",
        minHeight: "95vh",
        py: 6,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <OrbBackground
        hoverIntensity={0.7}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
        title="ZeroGravityZone"
      />
      <Typography variant="h5" align="center" sx={{ color: "white", mb: 2 }}>
        <RocketLaunchIcon /> ZeroGravityZone <RocketLaunchIcon />
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h6" align="center" sx={{ mb: 2 }}>
            Join ZeroGravityZone — Space awaits!
          </Typography>

          <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              name="name"
              label="Full Name"
              autoComplete="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              type="email"
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
              autoComplete="new-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={{ mb: 2 }}
            />

            <TextField
              margin="normal"
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeTerms"
                  color="primary"
                  checked={formik.values.agreeTerms}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              }
              label="I agree to the terms and conditions"
              sx={{ mb: 2 }}
            />
            {formik.touched.agreeTerms && formik.errors.agreeTerms && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {formik.errors.agreeTerms}
              </Typography>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, py: 1.5 }}
              disabled={loading || !formik.isValid}
            >
              {loading ? <CircularProgress size={24} /> : "SIGN UP"}
            </Button>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Typography variant="body2" align="center">
              Already have an account?{" "}
              <Link href="/login" underline="hover">
                Login
              </Link>
            </Typography>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;
