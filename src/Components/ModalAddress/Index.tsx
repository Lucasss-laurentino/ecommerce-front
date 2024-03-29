import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import InputMask from "react-input-mask";
import { useForm } from 'react-hook-form';
import { AddressContext } from "../../Contexts/AddressContext";
import './ModalAddress.css';

interface Props {
    modalAddress: boolean,
    setModalAddress: () => void,
}

export const ModalAddress = ({ modalAddress, setModalAddress }: Props) => {

    const { getAddresses, addresses, createAddress, deleteAddress, defaultAddress } = useContext(AddressContext);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [errorCep, setErrorCep] = useState('Cep');

    const [cep, setCep] = useState<string | null>();

    const [classShowForm, setClassShowForm] = useState<string>('text-center d-none');

    const [classHidenAddress, setClassHidenAddress] = useState<string>('container scroll');

    const [hidenAddresses, setHidenAddresses] = useState('container');

    const [classHidenBtn, setClassHidenBtn] = useState<string>('container d-flex justify-content-center');

    useEffect(() => {

        returnDefaultClasses()

    }, [addresses]);

    const switchClasses = () => {
        setHidenAddresses('d-none')
        setClassHidenBtn('d-none')
        setClassShowForm('text-center d-block')
    }

    const returnDefaultClasses = () => {
        setHidenAddresses('container')
        setClassHidenBtn('container d-flex justify-content-center')
        setClassShowForm('text-center d-none')
    }

    const searchCep = (e: any) => {

        var cep = e.target.value;

        var cepText = cep.replace(/\D/g, '');

        if (cepText.length === 8) {

            setCep(cepText);

            axios.get(`https://viacep.com.br/ws/${cepText}/json/`).then((response) => {

                // enviar pro backend

                if (response.data?.erro) {
                    setErrorCep('cep inválido');
                } else {

                    setValue('state', response.data.uf)
                    setValue('city', response.data.localidade)
                    setValue('district', response.data.bairro)
                    setValue('street', response.data.logradouro)

                    setErrorCep('cep');

                }
            });

        } else {
            setErrorCep('cep inválido');
        }

    }

    return (
        <Modal
            show={modalAddress}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={setModalAddress}>
                <Modal.Title id="contained-modal-title-vcenter" className='font-garlicha h1'>
                    Cadastre um local
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-geo-alt-fill mx-2" viewBox="0 0 16 16">
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className={hidenAddresses}>
                        {addresses.length > 0 &&
                        <ul className='scroll_address'>
                            {addresses?.map((address) => {
                                return (
                                    <li key={address._id}>
                                        <div className="d-flex justify-content-between">
                                            <p className="m-0 color d-flex align-items-center"><strong>Endereço:</strong></p>
                                            <div className="caps-btn">
                                                <button type='button' className={address.default ? 'btn btn-sm bg-success text-white' : 'text-muted border border-white bg-white'} onClick={() => defaultAddress(address._id)}>
                                                    Padrão
                                                </button>
                                                <button type='button' className='text-danger border border-white bg-white' onClick={() => deleteAddress(address._id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="data-address">
                                            <div className="row">
                                                <p className="m-0 mx-2">{address?.street},</p>
                                                <p className="m-0 mx-2">Número: {address?.number},</p>
                                                <p className="m-0 mx-2">{address?.district}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="d-flex">
                                                <p className="m-0 mx-2">{address?.city},</p>
                                                <p className="m-0 mx-2">{address?.state},</p>
                                            </div>
                                            <p className="m-0 mx-2">{address?.cep}</p>
                                        </div>
                                        <hr />
                                    </li>
                                )
                            })}
                        </ul>
                        }

                        {addresses.length === 0 && <h5 className='color text-center my-5'>Você não tem um endereço cadastrado</h5>}

                    </div>

                    <form className={classShowForm} onSubmit={handleSubmit(createAddress)}>
                        <div className="container d-flex justify-content-start">
                            <button type='button' className='border border-white bg-white color' onClick={returnDefaultClasses}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                </svg>
                            </button>
                        </div>
                        <div className="container my-4">
                            <InputMask
                                mask="99999-999"
                                type="text"
                                className='input-form-login'
                                {...register("cep", {
                                    onBlur: (e) => { searchCep(e) }
                                    , required: true
                                })}
                            />

                            {cep ?
                                <span className='mx-2 d-block '>cep</span>
                                :
                                <span className='text-danger mx-2 d-block '>campo obrigatório</span>
                            }

                        </div>
                        <div className="container my-4">
                            <input
                                type="text"
                                disabled
                                className='input-form-login'
                                {...register('state', { required: true })}
                            />
                            <span className='mx-2 d-block'>Estado</span>
                        </div>
                        <div className="container my-4">
                            <input
                                type="text"
                                className='input-form-login'
                                disabled
                                {...register('city')}
                            />
                            <span className='mx-2 d-block'>Municipio</span>
                        </div>
                        <div className="container my-4">
                            <input
                                type="text"
                                disabled
                                className='input-form-login'
                                {...register('district')}
                            />
                            <span className='mx-2 d-block'>Bairro</span>
                        </div>
                        <div className="container my-4">
                            <input
                                type="text"
                                disabled
                                className='input-form-login'
                                {...register("street")}
                            />
                            <span className='mx-2 d-block'>Rua</span>
                        </div>
                        <div className="container my-4">
                            <input
                                type="text"
                                className='input-form-login'
                                {...register("number", { required: true })}
                            />
                            {errors.number ?

                                <span className='text-danger mx-2 d-block'>Campo obrigatório</span>

                                :
                                <span className='mx-2 d-block'>Número da residência</span>

                            }
                        </div>
                        <div className="container">
                            <button type="submit" className="btn-login">
                                Cadastrar
                            </button>
                        </div>
                    </form>

                    <div className={classHidenBtn}>
                        <button className='btn-login w-100' onClick={switchClasses}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </button>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );

}