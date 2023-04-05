import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../actions/auth'

import { Typography, TextField, Button } from '@mui/material';

const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({ email: '', password: '', name: '' });
    const [user2, setUser2] = useState({ email: '', password: '' });


    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(signUp(user));

        navigate('/');

    }

    const handleSubmit2 = (event) => {
        event.preventDefault();

        dispatch(signIn(user2));
        navigate('/');

        // setTimeout(() => {
        //     navigate('/');
        // }, 2000);
    }



    return (
        <div>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6">Login</Typography>
                <TextField fullWidth label="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <TextField fullWidth label="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <TextField fullWidth label="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />

                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>SignUp</Button>
            </form>

            <form autoComplete="off" noValidate onSubmit={handleSubmit2}>
                <Typography variant="h6">Login</Typography>
                <TextField fullWidth label="Email" value={user2.email} onChange={(e) => setUser2({ ...user2, email: e.target.value })} />
                <TextField fullWidth label="Password" value={user2.password} onChange={(e) => setUser2({ ...user2, password: e.target.value })} />

                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>Login</Button>
            </form>
        </div>
    );
};

export default Auth;
