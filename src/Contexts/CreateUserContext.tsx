import { createContext, useState } from "react";
import { http } from "../http/http";

type CreateUserType = {

    createUser: (data: any) => void, 

}

export const CreateUserContext = createContext<CreateUserType>(null!);


export const CreateUserProvider = ({children}: {children: JSX.Element}) => {

    const createUser = (data: any) => {

        const emailCreate = data.emailCreate;
        const passwordCreate = data.passwordCreate;

        http.post('/createUser', { emailCreate, passwordCreate }).then((response) => {
            
            localStorage.setItem('token', response.data.token);

            window.location.href = '/';

        })
        
    }

    return (
        <CreateUserContext.Provider value={ {createUser} }>
        {children}
        </CreateUserContext.Provider>
    )

}