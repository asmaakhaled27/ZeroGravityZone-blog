import React, { useState } from "react";
import { Box } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import NavBar from "./NavBar.jsx";
import Posts from "./Posts.jsx";
import PostFormDialog from "./PostFormDialog.jsx"; // We'll create this next

function HomePage() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 const [posts, setPosts] = useState([]);
  return (
   
    <Box>
      {/* <NavBar /> */}
      
      <Posts posts={posts} />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <AddBoxIcon
          sx={{ color: "primary", fontSize: 100, cursor: "pointer" }}
          onClick={handleOpen}
        />
      </Box>
      <PostFormDialog  open={open} 
      handleClose={handleClose}
      setPosts={setPosts} />
    </Box>
  );
}

export default HomePage;
