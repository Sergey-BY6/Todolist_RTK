import {authSlice, authThunks} from 'features/auth/model/authSlice';


type AuthInitialState = {
    isLoggedIn: boolean,
    captchaUrl: null
}

let startState: AuthInitialState

beforeEach(() => {
    startState = {
        isLoggedIn: false,
        captchaUrl: null
    };
});

test('isLoggedIn should be false for logout', () => {
    const endState = authSlice(
        startState,
        authThunks.logout.fulfilled({isLoggedIn: false}, 'requestId', undefined))
    expect(endState.isLoggedIn).toBe(false);
});

test('isLoggedIn should be false login', () => {
    const endState = authSlice(
        startState,
        authThunks.login.fulfilled({isLoggedIn: true}, 'requestId', {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ""
        }))
    expect(endState.isLoggedIn).toBe(true);
});


test('isLoggedIn should be false for initializeApp', () => {
    const endState = authSlice(
        startState,
        authThunks.initializeApp.fulfilled({isLoggedIn: true}, 'requestId', undefined))
    expect(endState.isLoggedIn).toBe(true);
});




