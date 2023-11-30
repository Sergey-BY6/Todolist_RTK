import React from 'react';
import {Button} from '@mui/material';

import {useActions} from 'common/hooks';
import {
    FilterValuesType,
    TodolistDomainType,
    todolistsActions
} from 'features/TodolistsList/model/todolists/todolistsSlice';



type Props = {
    todolist: TodolistDomainType
}

export const FilterTasksButton = ({todolist}: Props) => {

    const {id, filter} = todolist
    const {changeTodolistFilter} = useActions(todolistsActions)

    const changeTodolistFilterHandler = (filter: FilterValuesType) => {
        changeTodolistFilter({filter, id})
    }

    return (
        <>
            <Button
                variant={filter === 'all' ? 'outlined' : 'text'}
                onClick={() => changeTodolistFilterHandler('all')}
                color={'inherit'}
            >
                All
            </Button>
            <Button
                variant={filter === 'active' ? 'outlined' : 'text'}
                onClick={() => changeTodolistFilterHandler('active')}
                color={'primary'}
            >
                Active
            </Button>
            <Button
                variant={filter === 'completed' ? 'outlined' : 'text'}
                onClick={() => changeTodolistFilterHandler('completed')}
                color={'secondary'}
            >
                Completed
            </Button>
        </>
    );
}


