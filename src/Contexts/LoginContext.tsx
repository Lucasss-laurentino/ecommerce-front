import { createContext, useState } from "react";
import { http } from "../http/http";
import User from "../types/User";

type LoginType = {
    user: User | undefined,
    login: (data: any) => void,
    validateToken: () => void,
    logout: () => void,
    errorLogin: string,
}

export const LoginContext = createContext<LoginType>(null!);

export const LoginProvider = ({children}: {children: JSX.Element}) => {

    const [user, setUser] = useState<User>();
    const [errorLogin, setErrorLogin] = useState<string>('');

    const login = (data: any) => {
    
        const email = data.email;
        const password = data.password;
    
        http.post('/login', {email, password}).then((response) => {

                localStorage.setItem('token', response.data.token); 
                window.location.href = '/';

            }).catch((response) => {

                setErrorLogin('Login incorreto')

            })
        

    }

    const validateToken = () => {

        http.post('/validateLogin').then((response) => {
            setUser(response.data)
        })
    
    }
    
    const logout = () => {
    
        setUser(undefined);
        localStorage.setItem('user', '');
        localStorage.setItem('token', '');
    
    }

    return (
        <LoginContext.Provider value={ {user, login, validateToken, logout, errorLogin} }>
            {children}
        </LoginContext.Provider>
    );

}