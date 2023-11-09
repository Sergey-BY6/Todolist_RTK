
import {AppRootStateType} from 'app/store';
import {createSelector} from '@reduxjs/toolkit';


export const selectIsLoading = (state: AppRootStateType) => state.auth.isLoggedIn

export const filteredByNamePacksSelector = createSelector ([selectIsLoading], (pack)=> {
    return [pack]
})