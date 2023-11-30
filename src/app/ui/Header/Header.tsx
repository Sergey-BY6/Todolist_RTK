import React from 'react';
import {AppBar, Button, IconButton, LinearProgress, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {useActions} from 'common/hooks';
import {authThunks} from 'features/auth/model/authSlice';
import {useSelector} from 'react-redux';
import {selectIsLoggedIn} from 'features/auth/model/authSelectors';
import {selectAppStatus} from 'app/model/appSelectors';



export const Header = () => {

    const isLoggedIn = useSelector(selectIsLoggedIn);
    const status = useSelector(selectAppStatus);
    const {logout} = useActions(authThunks);
    const logoutHandler = () => logout();



    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu />
                </IconButton>
                <Typography variant="h6">News</Typography>
                {isLoggedIn && (
                    <Button color="inherit" onClick={logoutHandler}>
                        Log out
                    </Button>
                )}
            </Toolbar>
            {status === "loading" && <LinearProgress />}
        </AppBar>
    );
};

