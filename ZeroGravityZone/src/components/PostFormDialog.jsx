import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const PostFormDialog = ({ open, handleClose, setPosts }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const { user } = useAuth();
// const { posts, setPosts } = setPosts();

  const handleSubmit = async (event) => {
    event.preventDefault();

   try {
  const response = await axios.post('http://localhost:3000/posts', newPost);
  console.log('Post added:', response.data);
   setPosts(prevPosts => [...prevPosts, newPost]);// Add new post to beginning
  handleClose();
} catch (error) {
  console.error('Error adding post:', error);
}
    if (!user) {
      console.error('No user logged in!');
      alert('Please log in to create a post');
      return;
    }

    const newPost = {
      title,
      content,
      image,
      author: user.name,       // Use profile name
      authorEmail: user.email, // Store email for reference
      userId: user.id,        // Use profile id
      createdAt: new Date().toISOString(),
      isDeleted: false,
      comments: [],
    };

    try {
      const response = await axios.post('http://localhost:3000/posts', newPost);
      console.log('Post added:', response.data);
      handleClose();
      
      // Reset form
      setTitle('');
      setContent('');
      setImage('');
    } catch (error) {
      console.error('Error adding post:', error);
      alert(`Error creating post: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Create New Post</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            label="Content"
            multiline
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="normal"
            fullWidth
            label="Image URL (Optional)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <DialogActions sx={{ px: 0 }}>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              size="large"
            >
              Publish Post
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PostFormDialog;