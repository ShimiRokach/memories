import React from 'react';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../../actions/posts'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Post = ({ post, setCurrentId }) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => dispatch(likePost(post._id))}>Like {post.likes.length}</Button>
                {user?.result?._id === post?.creator && (
                    <Button size="small" onClick={() => dispatch(deletePost(post._id))}>Delete</Button>
                )}
                {user?.result?._id === post?.creator && (
                    <Button size="small" onClick={() => setCurrentId(post._id)}>Update</Button>
                )}
            </CardActions>
        </Card>
    );
};

export default Post;
