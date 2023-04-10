import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CreateUserContext } from '../../Contexts/CreateUserContext';
import { MenuContext } from '../../Contexts/MenuContext';
import './CreateUser.css';

export const CreateUser = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { menu, setMenu } = useContext(MenuContext);

    const {createUser} = useContext(CreateUserContext);

    useEffect(() => {

        if(menu){
            setMenu(false);
        }

    },[])

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center div-form-login">
                
                <form className='form-createUser' onSubmit={(data) => handleSubmit(createUser)(data)}>
                    <input
                        type="email"
                        className="input-form-login my-3"
                        placeholder='Email'
                        {...register('emailCreate', {required: true})}
                    />
                    {errors.emailCreate && <p className='m-0 text-danger'>Campo obrigatório</p>}

                    <input
                        type="password"
                        className="input-form-login my-3"
                        placeholder="Senha"
                        {...register('passwordCreate', {required: true})}
                    />
                    {errors.passwordCreate && <p className='m-0 text-danger'>Campo obrigatório</p>}

                    <button type='submit' className='btn-login'>Cadastrar</button>

                </form>
            </div>
        </>
    );
}