import { api } from "./api.ts";
import type {AxiosResponse} from "axios";

interface LoginParams {
    username: string;
    password: string;
}

interface LoginResponse {
    access_token: string;
}

export const AuthService = {
    login: (params: LoginParams): Promise<AxiosResponse<LoginResponse>> => api.post('login', params),
}