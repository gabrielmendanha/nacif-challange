import { api } from "./api.ts";
import type { AxiosResponse } from "axios";
import type { TodoCreateParams, TodoObject } from "../interfaces/todo.ts";

export const TodosService = {
    list: (): Promise<AxiosResponse<TodoObject[]>> => api.get('todos'),
    delete: (id: number): Promise<void> => api.delete(`todos/${id}`),
    update: (todo: TodoObject): Promise<void> => api.put(`todos/${todo?.id}`, todo),
    add: (todo: TodoCreateParams): Promise<void> => api.post(`todos`, todo)
}