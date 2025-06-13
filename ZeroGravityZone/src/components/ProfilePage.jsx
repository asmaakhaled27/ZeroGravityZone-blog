import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Box,
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';

function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/profile/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, [id]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/posts?userId=${id}`);
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      }
    };
    fetchPosts();
  }, [id]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }
    if (currentPassword !== user.password) {
      setError('Current password is incorrect');
      return;
    }
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters');
      return;
    }

    try {
      await axios.patch(`http://localhost:3000/profile/${id}`, {
        password: newPassword,
      });
      setSnackbar({ open: true, message: 'Password updated successfully!', severity: 'success' });
      setOpenDialog(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setError('');
    } catch (error) {
      setSnackbar({ open: true, message: 'Failed to update password.', severity: 'error' });
      console.error(error);
    }
  };

  if (!user) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            ZeroGravityZone
          </Typography>
          <Button color="inherit" component={RouterLink} to="/blog">Blog</Button>
          <Button color="inherit" component={RouterLink} to={`/user-posts/${id}`}>My Posts</Button>
          <Button color="inherit" onClick={() => setOpenDialog(true)}>Change Password</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>

      {/* Profile Card */}
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Card elevation={3}>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar sx={{ width: 80, height: 80, mb: 2 }}>
                {user.name?.[0]?.toUpperCase()}
              </Avatar>
              <Typography variant="h5">{user.name}</Typography>
              <Typography variant="body1" color="text.secondary">{user.email}</Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                Special Member of ZeroGravityZone
              </Typography>
            </Box>
          </CardContent>
        </Card>

        <Box mt={4}>
          <Typography variant="h6" align="center" sx={{ mt: 2 }}>
            Your Posts
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 1 }}>
            Here are all the posts you have created
          </Typography>
          {posts.length > 0 ? (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
    {posts.map((post) => (
      <Card key={post.id} elevation={3} sx={{ width: 300, m: 2 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {post.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            by {post.author} — {new Date(post.createdAt || Date.now()).toLocaleDateString()}

          </Typography>
          <Typography variant="body1" color="text.primary">
            {post.content.slice(0, 120)}...
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                style={{ width: '100%', maxWidth: '300px', marginTop: '1rem' }}
              />
            )}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </Box>
) : (
  <Typography align="center" mt={2}>No posts found.</Typography>
)}

  
      {/* Password Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Confirm New Password"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" mt={1}>{error}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handlePasswordChange}>Update</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
        </Box>
        </Container>
    </>
  );
}

export default ProfilePage;
