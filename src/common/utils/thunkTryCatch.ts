import { AppDispatch, AppRootStateType } from 'app/store';
import { handleServerNetworkError } from 'common/utils/handle-server-network-error';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { appActions } from 'app/app.reducer';
import { BaseResponseType} from 'common/types';

/**
 * Асинхронная утилита для обработки ошибок и управления состоянием статуса при выполнении асинхронных Thunk.
 * Обертывает переданную логику в блок try-catch, обрабатывает сетевые ошибки и устанавливает соответствующий статус.
 *
 * @template T - Тип возвращаемого значения логики.
 *
 * @param {BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>} thunkAPI -
 *   Объект, предоставляющий доступ к функционалу Thunk, такому как диспетчер и rejectWithValue.
 * @param {function(): Promise<T>} logic - Асинхронная логика, которую нужно выполнить в блоке try.
 *
 * @returns {Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>} - Результат выполнения логики
 *   или значение rejectWithValue, если произошла ошибка.
 *
 * @throws {Error} Если переданный объект ошибки не соответствует ожидаемым типам.
 *

 */
export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponseType>,
    logic: () => Promise<T>
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
        return await logic();
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatus({ status: "idle" }));
    }
};
