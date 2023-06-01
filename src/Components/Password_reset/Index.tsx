import { useEffect, useState } from 'react';
import './Password_reset.css';
import { http } from '../../http/http';

export const Password_reset = () => {

    useEffect(() => {

        if (localStorage.getItem('tokenForgotPassword') === 'undefined') {

            window.location.href = '/';

        }

    }, [localStorage.getItem('emailForgotPassword')]);

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [erro, setErro] = useState('');
    const [erroToken, setErroToken] = useState('');
    const [changePass, setChangePass] = useState(false);
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    const verifyToken = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        http.post('verifyToken', { token }).then(response => {
            
            setEmail(response.data.email);
            setChangePass(true)
        
        }).catch((response) => {
        
            setErroToken('Código incompativel')
        
        });

    }

    const changePassword = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if (password === passwordConfirm) {

            http.put('changePassword', { email, password }).then(response => {
            
                localStorage.setItem('tokenForgotPassword', 'undefined');
                window.location.href = '/login';
                
            }).catch(response => {

                setErro('Não foi possivel alterar senha');
            
            });

        } else {

            setErro('Senhas não são iguais !');

        }


    }

    return (

        <>
            <div className="container-fluid size-div d-flex align-items-center justify-content-center">

                {localStorage.getItem('tokenForgotPassword') != 'undefined' &&

                    <>
                        {!changePass ?
                            <form onSubmit={verifyToken}>
                                <input type="text" value={token} onChange={(val) => setToken(val.target.value)} className='input-form-login my-3' placeholder='Digite o código' />
                                <button type="submit" className='btn-login'>Confirmar</button>
                                <p className="my-2 mx-0 text-danger">{erroToken}</p>
                            </form>
                            :
                            <div className="container d-flex justify-content-center">

                                <form onSubmit={changePassword}>
                                    <p>{email}</p>
                                    <input
                                        type="password"
                                        value={password}
                                        className="input-form-login my-3"
                                        placeholder="Digite sua senha"
                                        onChange={(val) => setPassword(val.target.value)}
                                    />
                                    <input
                                        value={passwordConfirm}
                                        type="password"
                                        className="input-form-login my-3"
                                        placeholder="Confirme sua senha"
                                        onChange={(val) => setPasswordConfirm(val.target.value)}
                                    />
                                    <button type="submit" className="btn-login">Confirmar</button>

                                    <p className="mx-0 my-2 text-danger">{erro}</p>
                                </form>
                            </div>

                        }
                    </>

                }

            </div>
        </>

    );

}