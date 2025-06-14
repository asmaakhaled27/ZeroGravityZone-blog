import React, { useState, useContext } from 'react';
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
import { usePosts } from "../context/PostContext.jsx";

const PostFormDialog = ({ open, handleClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const { user } = useAuth();
  const { posts,setPosts } = usePosts(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      console.error('No user logged in!');
      alert('Please log in to create a post');
      return;
    }

    const newPost = {
      title,
      content,
      image,
      author: user.name,
      authorEmail: user.email,
      userId: user.id,
      createdAt: new Date().toISOString(),
      isDeleted: false,
      comments: [],
    };

    try {
      const response = await axios.post('http://localhost:3000/posts', newPost);
      console.log('Post added:', response.data);
      
      // Update posts in context
      setPosts(prevPosts => [response.data, ...prevPosts]);
      
      // Reset and close
      setTitle('');
      setContent('');
      setImage('');
      handleClose();
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
              onClick={handleSubmit}
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