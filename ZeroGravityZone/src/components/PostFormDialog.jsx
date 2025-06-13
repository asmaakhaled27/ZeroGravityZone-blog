import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import ProfilePage from './ProfilePage';

const PostFormDialog = ({ open, handleClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPost = {
      title,
      content,
      image,
      author,
      userId: 1, // You can dynamically set this based on the logged-in user
      createdAt: new Date().toISOString(),
      isDeleted: false,
      comments: [],
    };

    try {
      const response = await axios.post('http://localhost:3000/posts', newPost);
      console.log('Post added:', response.data);
      handleClose(); // Close the dialog after adding the post

      // Reset form fields
      setTitle('');
      setContent('');
      setImage('');
      setAuthor('');
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Post</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="content"
            label="Content"
            name="content"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="image"
            label="Image URL"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="author"
            label="Author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
              Add Post
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PostFormDialog;
