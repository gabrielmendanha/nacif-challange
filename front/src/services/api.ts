import axios, {type AxiosInstance, type InternalAxiosRequestConfig} from 'axios';
import { getToken } from "../storage/authToken.ts";

const createAxiosInstance = (): AxiosInstance => {
    return axios.create({ baseURL: 'http://127.0.0.1:8000' });
}

const createInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getToken();

    if (!token) return config;

    config.headers.Authorization = `Bearer ${token}`;
    
    return config;
}

const api = createAxiosInstance();
api.interceptors.request.use((config) => createInterceptor(config));


export { api }