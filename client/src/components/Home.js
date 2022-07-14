import { Button, Grid, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import { logout } from '../redux/actions/auth';
import Wrapper from './misc/PageWrapper'

const Home = () => {
    const [statusLoading , setStatusLoading] = useState("okokok");
    const user = useSelector(state=>state.auth.user)

    const dispatch = useDispatch();

    const handleLoadSaveFile = () =>{
        console.log("Loading Game");
        setStatusLoading(true)
    }

    const handleLogout = () =>{
        dispatch(logout(user._id, user.refreshToken, user.accessToken))
    }

    return <Wrapper>
            <Grid container item xs={12} justifyContent="center">
                <Grid item>
                    <Typography variant="h3">Hey {user?.name}</Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
                <Grid item>
                    <Button onClick={handleLogout}>Logout</Button>
                </Grid>
            </Grid>
    </Wrapper>
}

export default Home