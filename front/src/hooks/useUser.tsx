import { createContext, type ReactNode, useContext, useMemo, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { removeToken, setToken } from "../storage/authToken.ts";

interface IUser {
    username: string;
}

interface IUserContext {
    state: {
        user: IUser | null
    },
    actions: {
        login: (token: string) => void,
        logout: () => void,
    }
}

const UserContext = createContext({} as IUserContext);

export const UserProvider = ({ children }: { children?: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>({} as IUser);

    const login = (token: string) => {
        const { sub } = jwtDecode(token);
        setUser({ username: sub ?? '' });
        setToken(token);
    };


    const logout = () => {
        setUser(null);
        removeToken();
    };

    const value = useMemo(
        () => ({
            state: {
                user
            },
            actions: {
                login,
                logout
            }
        }),
        [user]
    );
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
    return useContext(UserContext);
};