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
  TextField,
  Avatar,
  Box,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';

const Posts = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [selectedPost, setSelectedPost] = useState(null);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const { user } = useAuth();
  const { posts, setPosts } = usePosts(); 

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
          setPosts(posts.filter((post) => post.id !== id)); // Use context setPosts
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
          fetchPosts();
        })
        .catch((error) => {
          console.error('Error editing post:', error);
        });
    }
  };

  const handleAddComment = (postId) => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: user.name,
      authorEmail: user.email,
      content: commentText,
      createdAt: new Date().toISOString()
    };

    // Optimistic UI update using context
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...(post.comments || []), newComment]
        };
      }
      return post;
    });
    setPosts(updatedPosts);
    setCommentText('');

    // API call
    axios
      .patch(`http://localhost:3000/posts/${postId}`, {
        comments: [...(posts.find(p => p.id === postId).comments || [], newComment)]
      })
      .then(() => {
        fetchPosts();
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
        fetchPosts();
      });
  };

  const handleOpenComments = (post) => {
    setSelectedPost(post);
    setCommentDialogOpen(true);
  };

  const handleCloseComments = () => {
    setCommentDialogOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error fetching posts: {error}
        </Alert>
        <Button variant="contained" onClick={fetchPosts}>
          Retry
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ 
        mb: 4,
        fontWeight: 700,
        color: 'text.primary'
      }}>
        Space Blogs
      </Typography>
      
      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} sm={6} md={4}>
            <Card sx={{ 
              height: '100%',
              width: '80VW',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: 3,
              transition: 'transform 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)'
              }
            }}>
              <CardMedia
                component="img"
                height="200"
            
                image={post.image || './src/assets/placeholder.webp'}
                alt={post.title}
                sx={{
                  objectFit: 'cover',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px'
                }}
              />
              
              <CardContent sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                p: 3
              }}>
                <Box sx={{ mb: 1.5 }}>
                  <Typography 
                    gutterBottom 
                    variant="h6" 
                    component="div"
                    sx={{
                      fontWeight: 600,
                      lineHeight: 1.3,
                      height: '3.9em',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}
                  >
                    {post.title}
                  </Typography>
                </Box>
                
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ 
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '0.8rem'
                  }}
                >
                  <Avatar 
                    sx={{ 
                      width: 24, 
                      height: 24, 
                      mr: 1,
                      fontSize: '0.75rem',
                      bgcolor: 'primary.main'
                    }}
                  >
                    {post.author.charAt(0)}
                  </Avatar>
                  {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="text.primary"
                  sx={{
                    flexGrow: 1,
                    mb: 2,
                    height: '4.5em',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical'
                  }}
                >
                  {post.content}
                </Typography>
                
                <Divider sx={{ my: 1 }} />
                
                <Stack 
                  direction="row" 
                  spacing={1} 
                  sx={{ 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pt: 1
                  }}
                >
                  <Button
                    size="small"
                    startIcon={<CommentIcon />}
                    onClick={() => handleOpenComments(post)}
                    sx={{ textTransform: 'none' }}
                  >
                    {post.comments?.length || 0} Comments
                  </Button>
                  
                  {user?.id === post.userId && (
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(post)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(post.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Comments Dialog */}
      <Dialog 
        open={commentDialogOpen} 
        onClose={handleCloseComments} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle sx={{ fontWeight: 600 }}>Comments</DialogTitle>
        <DialogContent>
          {selectedPost?.comments?.length > 0 ? (
            <Box sx={{ mb: 2 }}>
              {selectedPost.comments.map((comment) => (
                <Box key={comment.id} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                      {comment.author.charAt(0)}
                    </Avatar>
                    <Typography variant="subtitle2">{comment.author}</Typography>
                    <Typography variant="caption" sx={{ ml: 1, color: 'text.secondary' }}>
                      {new Date(comment.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ pl: 4 }}>
                    {comment.content}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              No comments yet. Be the first to comment!
            </Typography>
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <Avatar sx={{ width: 40, height: 40, mr: 1 }}>
              {user?.name?.charAt(0) || 'U'}
            </Avatar>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{ mr: 1 }}
            />
            <IconButton
              color="primary"
              disabled={!commentText.trim()}
              onClick={() => handleAddComment(selectedPost.id)}
              size="large"
            >
              <SendIcon />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseComments}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};
export default Posts;