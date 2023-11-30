import React, {memo, useCallback, useEffect} from 'react';
import {TodolistDomainType} from 'features/TodolistsList/model/todolists/todolistsSlice';
import {tasksThunks} from 'features/TodolistsList/model/tasks/tasksSlice';
import {useActions} from 'common/hooks';
import {AddItemForm} from 'common/components';
import {TaskType} from 'features/TodolistsList/api/tasks/tasksApi.types';
import {FilterTasksButton} from 'features/TodolistsList/ui/Todolist/FilterTasksButtons/FilterTasksButton';
import {Tasks} from 'features/TodolistsList/ui/Todolist/Tasks/Tasks';
import {TodolistTitle} from 'features/TodolistsList/ui/Todolist/TodolistTitle/TodolistTitle';

type Props = {
    todolist: TodolistDomainType;
    tasks: TaskType[];
};


export const Todolist = memo(function ({todolist, tasks}: Props) {
    const {fetchTasks, addTask} = useActions(tasksThunks);


    useEffect(() => {
        fetchTasks(todolist.id);
    }, []);

    const addTaskCallback = useCallback(
        (title: string) => {
            return addTask({title, todolistId: todolist.id}).unwrap()
        },
        [todolist.id],
    );


    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
            <Tasks tasks={tasks} todolist={todolist}/>
            <div style={{paddingTop: '10px'}}>
                <FilterTasksButton todolist={todolist}/>
            </div>
        </div>
    );
});
