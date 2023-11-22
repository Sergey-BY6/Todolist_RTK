import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {appActions} from 'app/app.reducer';
import {authAPI, LoginParamsType} from 'features/auth/auth.api';
import {clearTasksAndTodolists} from 'common/actions';
import {createAppAsyncThunk, handleServerAppError, handleServerNetworkError, thunkTryCatch} from 'common/utils';
import {BaseResponseType} from 'common/types';
import {todolistsApi} from 'features/TodolistsList/todolists.api';
import {ResultCode} from 'common/enums';

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(initializeApp.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
            })
    }
});


// thunks

export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType
>(`${slice.name}/login`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.login(arg)
        if (res.data.resultCode === 0) {
            return {isLoggedIn: true}
        } else {
            const isShowAppError = !res.data.fieldsErrors.length
            handleServerAppError(res.data, dispatch, isShowAppError);
            return rejectWithValue(res.data)
        }
    })
})


export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/logout`, async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
            const res = await authAPI.logout()
            if (res.data.resultCode === 0) {
                dispatch(clearTasksAndTodolists());
                return {isLoggedIn: false}
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null)
            }
    })
})


const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(`${slice.name}/initializeApp`, async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            return {isLoggedIn: true}
        } else {
            return rejectWithValue(null)
        }
    }).finally(() => {
        dispatch(appActions.setAppInitialized({isInitialized: true}))
    })
})


export const authReducer = slice.reducer;
export const authThunk = {login, logout, initializeApp}