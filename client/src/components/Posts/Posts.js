import React from 'react';
import { Grid } from '@material-ui/core';

import Post from './Post/Post';

import { useSelector } from 'react-redux';


const Posts = ({ setCurrentId }) => {

    const posts = useSelector((state) => state.posts);

    return (
        <Grid container spacing={2} >
            {posts.map((post) => (
                <Grid item sm={6} key={post._id}>
                    <Post post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
