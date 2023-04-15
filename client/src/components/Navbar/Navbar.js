import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useLocation, useNavigate } from "react-router-dom";
import decode from "jwt-decode";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {

        const token = user?.token;

        if (token) {
            const decodeToken = decode(token);

            if (decodeToken.exp * 1000 < new Date().getTime()) logOut();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location]);


    const logOut = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/auth');
    }

    return (
        <AppBar position="static" color="inherit">
            <Toolbar>
                <Typography variant="h4"> Memories</Typography>
                <Typography color="inherit" variant="h6" component={Link} to="/" sx={{ marginLeft: '20px', textDecoration: 'none' }}>Home</Typography>
                {user ? <Button color="inherit" sx={{ marginLeft: 'auto' }} onClick={logOut}>logout {user.result.name}</Button >
                    :
                    <Button color="inherit" component={Link} to="/auth" sx={{ marginLeft: 'auto' }}>login</Button>
                }

            </Toolbar>
        </AppBar>
    )
}


export default Navbar;