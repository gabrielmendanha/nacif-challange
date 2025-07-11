import { useEffect, useState} from "react";
import { TodosService} from "../../services/todos.ts";
import type { TodoCreateParams, TodoObject } from "../../interfaces/todo.ts";

export const useTodos = () => {
    const [todos, setTodos] = useState<TodoObject[]>([]);
    const [currentEditingTodo, setCurrentEditingTodo] = useState<TodoObject>({} as TodoObject);
    const [displayEditModal, setDisplayEditModal] = useState<boolean>(false);
    const [displayCreateModal, setDisplayCreateModal] = useState<boolean>(false);

    const getTodos = async () => {
        const { data } = await TodosService.list();
        setTodos(data);
    }

    const handleUpdate = async (todo: TodoObject) => {
        await TodosService.update(todo);
        await getTodos();
        handleCloseEditModal();
    }

    const handleDelete = async (id: number) => {
        await TodosService.delete(id);
        await getTodos();
    }

    const handleCreate = async (todo: TodoCreateParams) => {
        await TodosService.add(todo)
        await getTodos();
        handleCloseCreateModal();
    }

    const handleCloseCreateModal = () => {
        setDisplayCreateModal(false);
    }

    const handleOpenCreateModal = () => {
        setDisplayCreateModal(true);
    }

    const handleCloseEditModal = () => {
        setDisplayEditModal(false);
    }

    const handleOpenEditModal = (todo: TodoObject) => {
        setCurrentEditingTodo(todo);
        setDisplayEditModal(true);
    }

    useEffect(() => {
        getTodos();
    }, []);


    return {
        todos,
        displayEditModal,
        displayCreateModal,
        currentEditingTodo,
        setDisplayEditModal,
        handleCloseEditModal,
        handleCloseCreateModal,
        handleOpenEditModal,
        handleOpenCreateModal,
        handleDelete,
        handleUpdate,
        handleCreate,
    }
}