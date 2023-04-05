import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import decode from "jwt-decode";

import { createPost, updatePost } from '../../actions/posts'

import { Typography, TextField, Button } from '@mui/material';


const Form = ({ currentId, setCurrentId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [postData, setPostData] = useState({ title: '', message: '' });

    const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));

    useEffect(() => {

        setUser(JSON.parse(localStorage.getItem('profile')));
        const token = user?.token;



        if (token) {
            const decodeToken = decode(token);

            if (decodeToken.exp * 1000 < new Date().getTime()) logOut();
        }

        if (post) setPostData(post);
    }, [post, localStorage]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (currentId !== 0) {
            dispatch(updatePost(currentId, postData));
            clear();
        } else {
            dispatch(createPost(postData));
            clear();
        }
    }

    const clear = () => {
        setPostData({ title: '', message: '' });
        setCurrentId(0);
    }

    const logOut = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/auth');
    }

    if (!user) {
        return (
            <>
                <Typography variant="h6">you need to login for posting</Typography>
                <Button variant="contained" color="primary" size="small" onClick={() => navigate('/auth')} fullWidth>Login/Signup</Button>
            </>

        )
    }

    return (
        <>

            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
                <TextField fullWidth label="Title" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField fullWidth label="Message" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                <Button variant="contained" color="secondary" size="small" onClick={logOut} fullWidth>LogOut</Button>
            </form>

        </>
    );
};

export default Form;
