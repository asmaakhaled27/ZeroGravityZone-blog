import React from 'react';
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import { Box } from '@mui/material';
import HomePage from './components/HomePage.jsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import About from './components/About.jsx';
// import { jsx as _jsx } from 'react/jsx-runtime';

// import axios from 'axios';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      </BrowserRouter>
    
  );
}

export default App;
