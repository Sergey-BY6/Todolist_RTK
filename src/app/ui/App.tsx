import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Toolbar,
    Typography,
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {Login} from 'features/auth/ui/login/login';
import {TodolistsList} from 'features/TodolistsList/ui/TodolistsList';
import {ErrorSnackbar} from 'common/components';
import {useActions} from 'common/hooks';
import {selectIsLoggedIn} from 'features/auth/model/authSelectors';
import {selectAppStatus, selectIsInitialized} from 'app/model/appSelectors';
import {authThunks} from 'features/auth/model/authSlice';
import {Header} from 'app/ui/Header/Header';
import {Routing} from 'app/ui/Routing/Routing';


function App() {

    const isInitialized = useSelector(selectIsInitialized);
    const {initializeApp} = useActions(authThunks);

    useEffect(() => {
        initializeApp()
    }, []);


    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar/>
                <Header/>
                <Routing/>
            </div>
        </BrowserRouter>
    );
}

export default App;
