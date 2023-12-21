import { createContext, useState } from "react";
import { http } from "../http/http";

type CreateUserType = {

    createUser: (data: any) => void,
    erroCreateUser: string,

}

export const CreateUserContext = createContext<CreateUserType>(null!);


export const CreateUserProvider = ({children}: {children: JSX.Element}) => {

    const [erroCreateUser, setErroCreateUser] = useState('');

    const createUser = (data: any) => {

        const emailCreate = data.emailCreate;
        const passwordCreate = data.passwordCreate;

        if(passwordCreate.length < 6){
        
            setErroCreateUser('Senha muito curta');
        
        }


        http.post('/createUser', { emailCreate, passwordCreate }).then((response) => {
    
            localStorage.setItem('token', response.data.token);

            window.location.href = '/';

        })
        
    }

    return (
        <CreateUserContext.Provider value={ {createUser, erroCreateUser} }>
        {children}
        </CreateUserContext.Provider>
    )

}