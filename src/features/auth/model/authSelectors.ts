import { AppRootStateType } from "app/store";
export const selectIsLoggedIn = (state: AppRootStateType) => state.auth.isLoggedIn;
export const isCaptchaUrl = (state: AppRootStateType) => state.auth.captchaUrl;
