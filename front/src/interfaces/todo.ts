export interface TodoCreateParams {
    title: string;
    completed?: boolean;
}

export interface TodoObject {
    title: string;
    completed: boolean;
    id: number;
}