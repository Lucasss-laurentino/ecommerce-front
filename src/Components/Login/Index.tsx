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

    }, [])

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

            if(response.data != false){

                localStorage.setItem('tokenForgotPassword', response.data.token);
                
                // usar Navigation
                window.location.href = '/password_reset';

            } 
            
            if(response.data === false){

                setErroForgotPassword('O email não foi reconhecido !')
            }

        });
    }

    const redirectProvider = (provider: string) => {
        http.get(`/auth/redirect/${provider}`).then(response => {
            console.log(response.data);
        })
    }

    return (
        <>
            <div className="container div-form-login">

                <div className="container d-flex justify-content-center align-items-end">

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

                        <button onClick={() => redirectProvider('google')} className='d-flex w-100 my-3 btn-google border border-white align-items-center'>
                            <div className="container col-1 p-0 icon-g">
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                    <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                </svg>
                            </div>
                            <div className="container text-start text-responsive">
                                <p className='m-0'>Faça Login no Google</p>
                            </div>
                        </button>
                        <button className='d-flex w-100 my-3 btn-facebook border border-white align-items-center'>
                            <div className="container col-1 p-0 icon-g">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook " viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                </svg>
                            </div>
                            <div className="container text-start text-responsive">
                                <p className='m-0'>Faça Login com o Facebook</p>
                            </div>
                        </button>

                        <Link to='/createUser' className='my-3 text-dark'>Ainda não possui cadastro ?</Link>
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