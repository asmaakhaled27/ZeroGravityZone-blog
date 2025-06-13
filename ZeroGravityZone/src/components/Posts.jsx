import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Alert,
  Button,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoading(true);
    axios
      .get('http://localhost:3000/posts')
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
        setError(error.message);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      axios
        .delete(`http://localhost:3000/posts/${id}`)
        .then(() => {
          setPosts(posts.filter((post) => post.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
        });
    }
  };

  const handleEdit = (post) => {
    const updatedTitle = prompt('Edit Title:', post.title);
    const updatedContent = prompt('Edit Content:', post.content);

    if (updatedTitle && updatedContent) {
      axios
        .patch(`http://localhost:3000/posts/${post.id}`, {
          title: updatedTitle,
          content: updatedContent,
        })
        .then(() => {
          fetchPosts(); // Refresh the list
        })
        .catch((error) => {
          console.error('Error editing post:', error);
        });
    }
  };

  if (loading) {
    return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Error fetching posts: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        Space Blogs
      </Typography>
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={post.image}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  by {post.author} — {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
                <Typography variant="body1" color="text.primary">
                  {post.content.slice(0, 120)}...
                </Typography>
              </CardContent>
              <Stack direction="row" spacing={3} sx={{ p: 2, pt: 0, flexDirection: 'row-reverse' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(post)}
                >
                 <EditIcon />
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(post.id)}
                >
                  <DeleteIcon />
                </Button>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Posts;
