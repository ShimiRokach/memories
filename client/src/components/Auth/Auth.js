import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from '../../actions/auth'

import { Typography, TextField, Button, Container } from '@mui/material';

const Auth = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState({ email: '', password: '', name: '' });

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);


    const handleSubmit = (event) => {
        event.preventDefault();
        if (isSignup) {
            dispatch(signUp(user));
        } else {
            dispatch(signIn(user));
        }


        setTimeout(() => {
            navigate('/');
        }, 2000);

    }


    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const switchMode = () => {
        setIsSignup(!isSignup);
    }



    return (
        <Container sx={{ maxWidth: 'xs', textAlign: 'center' }}>
            <Typography variant="h6">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>

                {isSignup && (
                    <>
                        <TextField fullWidth label="Name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                    </>)}

                <TextField fullWidth label="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <TextField fullWidth label="Password" type={showPassword ? 'text' : 'password'} value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                    InputProps={{
                        endAdornment: (
                            <Button onClick={handleTogglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'}
                            </Button>
                        )
                    }} />

                <Button variant="contained" color="primary" size="large" type="submit" fullWidth>{isSignup ? 'Sign Up' : 'Sign In'}</Button>
            </form>

            <Button size="large" fullWidth onClick={switchMode}>{isSignup ? 'Already have an account ? Sign In' : "Don't have an account ? Sign Up"}</Button>

        </Container>
    );
};

export default Auth;
