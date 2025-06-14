import React, { useState } from "react";
import { Box } from "@mui/material";
// import AddBoxIcon from '@mui/icons-material/AddBox';
import NavBar from "./NavBar.jsx";
import Posts from "./Posts.jsx";
// import PostFormDialog from "./PostFormDialog.jsx"; // We'll create this next

function HomePage() {
  const [posts] = useState([]);
  return (
   
    <Box>
      <NavBar />
      
      <Posts posts={posts} />
      
    </Box>
  );
}

export default HomePage;
