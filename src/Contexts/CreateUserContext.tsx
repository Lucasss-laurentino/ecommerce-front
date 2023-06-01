import { createContext, useState } from "react";
import { http } from "../http/http";
import User from "../types/User";

type CreateUserType = {

    createUser: (data: any) => void, 

}

export const CreateUserContext = createContext<CreateUserType>(null!);


export const CreateUserProvider = ({children}: {children: JSX.Element}) => {

    const createUser = (data: any) => {

        const emailCreate = data.emailCreate;
        const passwordCreate = data.passwordCreate;

        http.post('/createUser', { emailCreate, passwordCreate }).then((response) => {

            localStorage.setItem('user', response.data[0].id);
            localStorage.setItem('token', response.data[1]);

            window.location.href = '/';

        })

    }

    return (
        <CreateUserContext.Provider value={ {createUser} }>
        {children}
        </CreateUserContext.Provider>
    )

}