import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import LoginPage from "./components/LoginPage.jsx";
import SignupPage from "./components/SignupPage.jsx";
import { Box } from "@mui/material";
import HomePage from "./components/HomePage.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import About from "./components/About.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import HeroSection from "./components/HeroSection.jsx";
import PostFormDialog from "./components/PostFormDialog.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PostsProvider } from "./context/PostContext.jsx";
import CircularText from "./Animation/CircularText";
import Posts from "./components/Posts.jsx";
import HomeById from "./components/HomeById.jsx";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <AuthProvider>
        <PostsProvider>
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/HeroSection" element={<HeroSection />} />
            <Route path="/blog" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
            <Route path="/PostFormDialog" element={<PostFormDialog />} />
            {/* <Route path="/Posts" element={<Posts  posts={Posts} />} /> */}
            <Route path="/HomeById" element={<HomeById />} />
          </Routes>
          <Routes>
            <Route
              path="http://localhost:3000/profile/:Id"
              element={<ProfilePage />}
            />
          </Routes>
          <CircularText
            text="*Z*G*Z"
            onHover="speedUp"
            spinDuration={20}
            className="custom-class"
          />
        </PostsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
