import {Dispatch} from 'redux';
import axios, {AxiosError} from 'axios';
import {appActions} from 'app/app.reducer';


/**
 * Обработчик ошибок сетевого запроса к серверу. Используется для обработки ошибок,
 * возникающих в результате выполнения асинхронных запросов.
 *
 * @param {unknown} e - Объект ошибки, который необходимо обработать.
 * @param {Dispatch} dispatch - Функция диспетчера Redux для отправки действий.
 *
 * @throws {Error} Если переданный объект ошибки не соответствует ожидаемым типам.
 */
export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
    const err = e as Error | AxiosError<{ error: string }>;
    if (axios.isAxiosError(err)) {
        const error = err.message ? err.message : 'Some error occurred';
        dispatch(appActions.setAppError({error}));
    } else {
        dispatch(appActions.setAppError({error: `Native error ${err.message}`}));
    }
    dispatch(appActions.setAppStatus({status: 'failed'}));
};
