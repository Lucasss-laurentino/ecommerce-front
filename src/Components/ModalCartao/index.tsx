import { useContext, useEffect, useState } from 'react';
import './index.css';
import Modal from 'react-bootstrap/Modal';
import { CartaoContext } from '../../Contexts/CartaoContext';
import Cards from 'react-credit-cards'
import React from 'react';

export const ModalCartao = () => {

    const { cartaoModal, setCartaoModal, createCard, getCartoes, cartoes, cartaoDefault, getCardDefault, cardDefaultState } = useContext(CartaoContext);

    const [nomeCartao, setNomeCartao] = useState('');
    const [numeroCartao, setNumeroCartao] = useState('');
    const [dataCartao, setDataCartao] = useState('');
    const [cvcCartao, setCvcCartao] = useState('');
    const [gatilhoFormCards, setGatilhoFormsCards] = useState(false);
    const [animeHidenFormCards, setAnimeHidenFormCards] = useState('scroll-cards');
    const [showForm, setShowForm] = useState('d-none');

    useEffect(() => {

        getCartoes();

    }, [cardDefaultState]);

    const prepararDadosEcriarCartao = () => {

        const cartao = {
            _id: '',
            nome: nomeCartao,
            numero: numeroCartao,
            data: dataCartao,
            cvc: cvcCartao,
            default: false,
            user_id: '',
        }

        createCard(cartao);

        setNomeCartao('');
        setNumeroCartao('');
        setDataCartao('')
        setCvcCartao('')

    }

    return (
        <>
            <Modal
                show={cartaoModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onHide={() => setCartaoModal(false)}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <p className="m-0 color font-garlicha h1">Cadastre um cartao</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={animeHidenFormCards}>
                        <ul className='list-cards'>
                        {cartoes.map((cartao) => { 
                            return (
                                <React.Fragment key={cartao._id}>
                                {cartoes &&
                                <li  key={cartao._id} className='my-4'>
                                    <div className="d-flex justify-content-end">
                                        <button type='button' className={cartao.default ? 'text-success border border-white bg-white' : 'text-muted border border-white bg-white'}
                                            onClick={() => {
                                                cartaoDefault(cartao);
                                            }}
                                        >
                                            Escolher
                                        </button>
                                        <button type='button' className='text-danger border border-white bg-white'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                            </svg>
                                        </button>
                                    </div>
                                        
                                    <Cards
                                    number={cartao.numero}
                                    name={cartao.nome}
                                    expiry={cartao.data}
                                    cvc={cartao.cvc}
                                    />
                                    
                                </li>
                                }
                                </React.Fragment>
                            )
                        })}
                        </ul>
                    </div>

                        {!cartoes || gatilhoFormCards &&
                        <div className={showForm}>
                            <div className="d-flex justify-content-start align-items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16"
                                    onClick={() => {
                                        setGatilhoFormsCards(false);
                                        setAnimeHidenFormCards('scroll-cards')
                                        setShowForm('d-none')                                        
                                    }}
                                >
                                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"/>
                                </svg>
                            </div>
                            <form className='my-3'>
                                <div className="form-group">
                                    <input type="text" value={nomeCartao} onChange={(value) => setNomeCartao(value.target.value)} className="input-form-login my-3" placeholder="Nome impresso no cartão" />
                                </div>
                                <div className="form-group">
                                    <input type="number" className="input-form-login my-3" placeholder="Numero do cartão" value={numeroCartao} onChange={(value) => setNumeroCartao(value.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="text" className="input-form-login my-3" placeholder="Vencimento" value={dataCartao} onChange={(value) => setDataCartao(value.target.value)} />
                                </div>
                                <div className="form-group">
                                    <input type="number" className="input-form-login my-3" placeholder="CVC" value={cvcCartao} onChange={(value) => setCvcCartao(value.target.value)} />
                                </div>

                                <button type="button" className="btn-login my-3" onClick={() => prepararDadosEcriarCartao()}>cadastrar</button>
                            </form>
                        </div>
                        }

                        {!gatilhoFormCards &&
                        <div className='d-flex justify-content-center align-items-center'>
                            <button className='btn btn-dark btn-sm w-100' onClick={() => { 
                                setGatilhoFormsCards(true) 
                                setAnimeHidenFormCards('animeFormCards')
                                setShowForm('showForm')
                            }}>novo cartão</button>
                        </div>
                        }
                    
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}