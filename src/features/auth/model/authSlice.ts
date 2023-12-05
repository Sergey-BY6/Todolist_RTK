import {createSlice, isAnyOf} from '@reduxjs/toolkit';
import {authAPI, LoginParamsType} from 'features/auth/api/authApi';
import {clearTasksAndTodolists} from 'common/actions';
import {createAppAsyncThunk} from 'common/utils';
import {ResultCode} from 'common/enums';


const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('auth/login', async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    const res = await authAPI.login(arg);
    if (res.data.resultCode === ResultCode.Success) {
        return {isLoggedIn: true};
    } else if (res.data.resultCode === ResultCode.Captcha) {
        dispatch(getCaptchaUrl())
        return rejectWithValue(res.data);
    } else {
        return rejectWithValue(res.data);
    }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('auth/logout', async (_, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI;
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.Success) {
        dispatch(clearTasksAndTodolists());
        return {isLoggedIn: false};
    } else {
        return rejectWithValue(res.data);
    }
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>('auth/initializeApp', async (_, thunkAPI) => {
    const {rejectWithValue} = thunkAPI;
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.Success) {
        return {isLoggedIn: true};
    } else {
        return rejectWithValue(res.data);
    }
});


const getCaptchaUrl = createAppAsyncThunk<{ captchaUrl: string }, void>('auth/getCaptchaUrl', async (_, thunkAPI) => {
        const res = await authAPI.getCaptcha();
        return {captchaUrl: res.data.url}
});




const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        captchaUrl: null as null | string
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authThunks.getCaptchaUrl.fulfilled, (state, action) => {
                state.captchaUrl = action.payload.captchaUrl
            })
            .addMatcher(isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
                (state, action) => {
                    state.isLoggedIn = action.payload.isLoggedIn;
                    state.captchaUrl = null
                })

    },
});

export const authSlice = slice.reducer;
export const authThunks = {login, logout, initializeApp, getCaptchaUrl};
