import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../Contexts/LoginContext';
import { MenuContext } from '../../Contexts/MenuContext';
import './Login.css';

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { login, errorLogin } = useContext(LoginContext);

    const { menu, setMenu } = useContext(MenuContext);

    useEffect(() => {

        if(menu){
            setMenu(false);
        }

    }, [])

    return (
        <>
        <div className="container d-flex justify-content-center align-items-end div-form-login">
            <form className='form-login' onSubmit={(data) => handleSubmit(login)(data)}>
                <input 
                    type="email" 
                    className="input-form-login my-3" 
                    placeholder='Email' 
                    {...register('email', {required: true})}
                />
                {errors.email && <p className='m-0 text-danger'>Campo obrigatório</p>}
                
                <input 
                    type="password" 
                    className="input-form-login my-3" 
                    placeholder="Senha"
                    {...register('password', {required: true})}
                />
                {errors.password && <p className='m-0 text-danger'>Campo obrigatório</p>}                
                
                <button type='submit' className='btn-login'>Entrar</button>

                <button className='d-block w-100 my-3'>
                    google
                </button>
                <button className='d-block w-100 my-3'>
                    email
                </button>

                <Link to='/createUser' className='my-3 text-dark'>Ainda não possui cadastro ?</Link>
            
                {errorLogin && <p className='mt-2 text-danger'>{errorLogin}</p>}

            </form>
        </div>
        </>
    );

}