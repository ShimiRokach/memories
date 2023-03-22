import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts'

import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import { Grid } from '@mui/material';

const App = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <Grid container>
            <Grid item sm={7}>
                <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
        </Grid>
    );
};

export default App;
