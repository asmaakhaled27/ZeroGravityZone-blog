import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from '@mui/material';

const PostForm = ({ onPostAdded }) => {
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
      onPostAdded(response.data); // Notify the parent component that a new post has been added

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
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 4, p: 4 }}>
        <Typography component="h1" variant="h5" align="center">
          Add New Post
        </Typography>
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Post
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostForm;
