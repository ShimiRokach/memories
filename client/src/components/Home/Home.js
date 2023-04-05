import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPosts } from '../../actions/posts'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

import { Grid } from '@mui/material';

const Home = () => {
    const [currentId, setCurrentId] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    const data = useSelector((state) => state);
    console.log(data);
    return (
        <Grid container>
            <Grid item sm={8}>
                <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>

        </Grid>
    );
};

export default Home;
