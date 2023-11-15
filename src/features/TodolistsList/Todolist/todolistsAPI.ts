import {instance} from 'common/api/instance';
import {UpdateDomainTaskModelType} from 'features/TodolistsList/tasks.reducer';
import {ResponseType} from 'common/types/commonTypes'
import {TaskPriorities, TaskStatuses} from 'common/enums/enums';

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists");
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title});
    },
    deleteTodolist(arg: {id: string}) {
        const promise = instance.delete<ResponseType>(`todo-lists/${arg.id}`);
        return promise;
    },
    updateTodolist(arg: {id: string, title: string}) {
        const promise = instance.put<ResponseType>(`todo-lists/${arg.id}`, { title: arg.title });
        return promise;
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(arg: { taskId: string, todolistId: string }) {
        return instance.delete<ResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
    },
    createTask(arg: CreatTaksArg) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${arg.todolistId}/tasks`, { title: arg.title });
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
};



// types
export type TodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};

export type TaskType = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};
export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
};
export type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: TaskType[];
};

export type CreatTaksArg = {
    todolistId: string
    title: string
}

export type UpdateTaksArg = {
    taskId: string
    domainModel: UpdateDomainTaskModelType
    todolistId: string
}

