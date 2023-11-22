import {Dispatch} from 'redux';
import {appActions} from 'app/app.reducer';
import {BaseResponseType} from 'common/types';


/**
 * Обрабатывает ошибки, полученные от сервера.
 *
 * @template D - Обобщенный тип для данных, полученных от сервера.
 * @param data - Данные ответа от сервера.
 * @param dispatch - Функция диспетчера Redux.
 * @param showError - Флаг, определяющий, следует ли отображать ошибку (по умолчанию true).
 * @returns void - Функция не возвращает значения.
 */
export const handleServerAppError = <D>(
    data: BaseResponseType<D>,
    dispatch: Dispatch,
    showError: boolean = true
): void => {
    if (showError) {
        dispatch(appActions.setAppError(
            data.messages.length ? { error: data.messages[0] } : { error: 'Произошла ошибка' }
        ));
    }
    dispatch(appActions.setAppStatus({ status: 'failed' }));
};



