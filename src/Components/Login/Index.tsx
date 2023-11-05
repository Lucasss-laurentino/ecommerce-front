import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../Contexts/LoginContext';
import { MenuContext } from '../../Contexts/MenuContext';
import './Login.css';
import { http } from '../../http/http';

export default function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { login, errorLogin } = useContext(LoginContext);

    const { menu, setMenu } = useContext(MenuContext);

    const [classForm, setClassForm] = useState('form-login');

    const [classFormResetPassword, setClassFormResetPassword] = useState('d-none');

    const [emailForgotPassword, setEmailForgotPassword] = useState('');

    const [erroForgotPassword, setErroForgotPassword] = useState('');

    useEffect(() => {

        if (menu) {
            setMenu(false);
        }

    })

    const animate = () => {
        setClassForm('d-none');
        setClassFormResetPassword('d-flex align-self-center')
    }

    const returnClass = () => {
        window.location.reload();
    }

    const forgotPassword = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        http.post('forgotPassword', {emailForgotPassword}).then(response => {

            if(response.data !== false){

                localStorage.setItem('tokenForgotPassword', response.data.token);
                
                // usar Navigation
                window.location.href = '/password_reset';

            } 
            
            if(response.data === false){

                setErroForgotPassword('O email não foi reconhecido !')
            }

        });
    }

    return (
        <>
            <div className="div-form-login">

                <div className="div-login">

                    <form className={classForm} onSubmit={(data) => handleSubmit(login)(data)}>
                        <input
                            type="email"
                            className="input-form-login my-3"
                            placeholder='Email'
                            {...register('email', { required: true })}
                        />
                        {errors.email && <p className='m-0 text-danger'>Campo obrigatório</p>}

                        <input
                            type="password"
                            className="input-form-login my-3"
                            placeholder="Senha"
                            {...register('password', { required: true })}
                        />
                        {errors.password && <p className='m-0 text-danger'>Campo obrigatório</p>}

                        <button type='submit' className='btn-login'>Entrar</button>

                        <Link to='/createUser' className='my-5 createUserPage text-dark'>Ainda não possui cadastro ?</Link>
                        <button className='d-block w-100 text-dark bg-white border border-white text-decoration-underline' onClick={animate}>Esqueceu sua senha ?</button>
                        {errorLogin && <p className='mt-2 text-danger'>{errorLogin}</p>}

                    </form>

                    <div className={classFormResetPassword}>
                        <div className="">
                            <button className='bg-white border border-white' onClick={returnClass}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                </svg>
                            </button>

                            <form action="form-login" onSubmit={forgotPassword}>
                                <input
                                    type="email"
                                    className="input-form-login my-3"
                                    placeholder='Email'
                                    value={emailForgotPassword}
                                    onChange={(e) => setEmailForgotPassword(e.target.value)}
                                />
                                <button type='submit' className='btn-login'>Recuperar</button>
                                {erroForgotPassword && <p className="mx-0 my-2 text-danger">{erroForgotPassword}</p>}
                            </form>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );

}