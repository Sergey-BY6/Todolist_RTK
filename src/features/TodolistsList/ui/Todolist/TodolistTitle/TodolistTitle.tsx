import React, {useCallback} from 'react';
import {EditableSpan} from 'common/components';
import {IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {
    TodolistDomainType,
    todolistsActions,
    todolistsThunks
} from 'features/TodolistsList/model/todolists/todolistsSlice';
import {useActions, useAppDispatch} from 'common/hooks';


type Props = {
    todolist: TodolistDomainType;
}

export const TodolistTitle = ({todolist}: Props) => {
    const {id, entityStatus, title} = todolist
    const dispatch = useAppDispatch()

    const {changeTodolistTitle, removeTodolist} = useActions(todolistsThunks)
    const {changeTodolistEntityStatus} = useActions(todolistsActions)

    const removeTodolistHandler = () => {
        removeTodolist(id)
            .unwrap()
            .catch(error => {
                changeTodolistEntityStatus({id, entityStatus: "failed"})
            })
    }

    const changeTodolistTitleCallback = useCallback(
        (title: string) => {
            changeTodolistTitle({id, title});
        },
        [id],
    );


    return (
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleCallback}/>
            <IconButton onClick={removeTodolistHandler} disabled={entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
    );
};

