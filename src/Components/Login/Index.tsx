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

        if (menu) {
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

                    <button className='d-flex w-100 my-3 btn-google border border-white'>
                        <div className="container col-1 p-0 icon-g">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                            </svg>
                        </div>
                        <div className="container text-start">
                            <p className='m-0'>Faça Login no Google</p>
                        </div>
                    </button>
                    <button className='d-flex w-100 my-3 btn-facebook border border-white'>
                        <div className="container col-1 p-0 icon-g">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                            </svg>                        
                        </div>
                        <div className="container text-start">
                            <p className='m-0'>Faça Login com o Facebook</p>
                        </div>
                    </button>

                    <Link to='/createUser' className='my-3 text-dark'>Ainda não possui cadastro ?</Link>

                    {errorLogin && <p className='mt-2 text-danger'>{errorLogin}</p>}

                </form>
            </div>
        </>
    );

}