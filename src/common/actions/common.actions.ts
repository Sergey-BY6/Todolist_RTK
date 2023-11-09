import {createAction} from '@reduxjs/toolkit';
import {TasksStateType} from 'features/TodolistsList/tasks-reducer';
import {TodolistDomainType} from 'features/TodolistsList/todolists-reducer';



export const clearTaskAndTodolists = createAction("common/clear-tasks-todolists")


// export type ClearTaskAndTodolistsType = {
//     tasks: TasksStateType,
//     todolists: TodolistDomainType[]
// }

// export const clearTaskAndTodolists = createAction<ClearTaskAndTodolistsType>("common/clear-tasks-todolists")



// export const clearTaskAndTodolists = createAction("common/clear-tasks-todolists", (tasks: TasksStateType, todolists: TodolistDomainType[]) => {
//     let random = 100
//     return {
//         payload: {
//             tasks,
//             todolists,
//             id: random > 90 ? "1" : "2"
//         }
//     }
// })
