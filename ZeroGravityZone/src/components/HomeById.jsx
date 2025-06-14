import React, { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography, Button, Avatar } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Posts from "./Posts.jsx";
import PostFormDialog from "./PostFormDialog.jsx";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { usePosts } from "../context/PostContext.jsx";

function HomeById() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { posts, setPosts } = usePosts();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get user ID from local storage or wherever you store it
  const id = localStorage.getItem("userId");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts
        const postsRes = await axios.get("http://localhost:3000/posts");
        setPosts(postsRes.data);

        // Fetch user data if ID exists
        if (id) {
          const userRes = await axios.get(`http://localhost:3000/profile/${id}`);
          setUser(userRes.data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.response?.status === 401) {
          handleLogout(); // Auto logout if unauthorized
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          {user && (
            <Button onClick={() => navigate(`/profile/${user.id}`)}>
              <Avatar 
                sx={{ width: 40, height: 40, mr: 1 }}
                alt={user.name}
                src={user.avatar}
              >
                {user.name?.[0]?.toUpperCase()}
              </Avatar>
              <Typography variant="subtitle1" sx={{ color: "white" }}>
                {user.name}
              </Typography>
            </Button>
          )}
          
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            ZeroGravityZone
          </Typography>
           <Button color="inherit" onClick={()=>navigate(-1)}>
            profile
          </Button>
          <Button color="inherit" component={RouterLink} to="/HomeById">
            Blog
          </Button>
          <Button color="inherit" component={RouterLink} to="/about">
            About
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Posts posts={posts} />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <AddBoxIcon
          color="primary"
          sx={{ fontSize: 100, cursor: "pointer" }}
          onClick={handleOpen}
        />
      </Box>

      <PostFormDialog
        open={open}
        handleClose={handleClose}
        setPosts={setPosts}
      />
    </Box>
  );
}

export default HomeById;