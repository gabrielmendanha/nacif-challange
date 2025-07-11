import {type FormEvent, useState} from "react";
import { AuthService } from "../../services/auth.ts";
import { useNavigate } from "react-router";
import { useUser } from "../../hooks/useUser.tsx";

export const useLogin = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();
    const { actions: { login } } = useUser();

    const handleLogin = async (event: FormEvent) => {
        try {
            event.preventDefault();

            setLoading(true);

            const { data } = await AuthService.login({ username, password });

            login(data.access_token);

            navigate("/todos");
        } finally {
            setLoading(false);
        }
    }


    return { setUsername, setPassword, handleLogin, loading }
}