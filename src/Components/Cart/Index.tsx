import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../Contexts/CartContext';
import './Cart.css';
import Quantity from '../Quantity/Index';
import { AddressContext } from '../../Contexts/AddressContext';
    
export const Cart = () => {

    const { getCarts, carts, selectProduct, resetQuantity, total, deleteCart } = useContext(CartContext);

    const { modalAddresses, setModalAddresses, getAddresses, addresses, getPriceDeliveryAddressDefault, priceDeliveryAddressDefault } = useContext(AddressContext);

    useEffect(() => {

        getCarts();
        resetQuantity();
        getAddresses();

    }, [])

    useEffect(() => {
        getPriceDeliveryAddressDefault()
    }, [addresses])

    const openModalAddresses = () => {

        setModalAddresses(true);
    }
    
    return (
        <>
            <div className="container mt-5">

                <h5 className="mb-3"><a href="/" className="text-body"><i
                    className="fas fa-long-arrow-alt-left me-2"></i>Continuar comprando</a></h5>
                <hr />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <p className="mb-0">Você tem {carts.length} itens no carrinho</p>
                    </div>
                </div>

                <div className="row">

                    {/* produtos */}
                    <div className="col-lg-7">
                        <div className="container scroll-cards">
                            {carts.map((cart) => {
                                return (
                                    <React.Fragment key={cart.id}>
                                        <div className="card-border mb-3">
                                            <div className="card-body">
                                                <div className="d-flex justify-content-end align-items-center">
                                                    <button className='bg-white text-danger border border-white' onClick={() => deleteCart(cart)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <input type="checkbox" name={cart.name_product} className='m-2' id={cart.name_product} onClick={() => selectProduct(cart)} />
                                                    <div className="d-flex color flex-row align-items-center">
                                                        <div className='col-7'>
                                                            <img
                                                                src={cart.img_product}
                                                                className="img-fluid" alt="Shopping item" />
                                                        </div>
                                                        <div className="col-5">
                                                            <h5 className='text_responsive'>{cart.name_product}</h5>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-end flex-row align-items-center col-3 col-lg-3 col-sm-3 col-md-4">
                                                        <div className=''>
                                                            <h5 className='text_responsive'>R$:{cart.price_product}</h5>
                                                            <Quantity productCart={cart} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                    </React.Fragment>
                                );
                            })}
                        </div>

                    </div>

                    {/* form cartao */}
                    <div className="col-lg-5 scroll-card-data">

                        <div className="card bg-dark text-white rounded-3">
                            <div className="card-body">

                                <form className="mt-4">
                                    <div className="form-outline form-white mb-4">
                                        <input type="text" id="typeName" className="form-control form-control-lg"
                                            placeholder="" />
                                        <label className="form-label" htmlFor="typeName">Nome impresso no cartão</label>
                                    </div>

                                    <div className="form-outline form-white mb-4">
                                        <input type="text" id="" className="form-control form-control-lg"
                                            placeholder="1234 5678 9012 3457" />
                                        <label className="form-label" htmlFor="typeText">Número do cartão</label>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-md-6">
                                            <div className="form-outline form-white">
                                                <input type="text" id="typeExp" className="form-control form-control-lg"
                                                    placeholder="00/00/0000" />
                                                <label className="form-label" htmlFor="typeExp">Data de expiração</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-outline form-white">
                                                <input type="password" id="typeText" className="form-control form-control-lg"
                                                    placeholder="&#9679;&#9679;&#9679;" />
                                                <label className="form-label" htmlFor="typeText">Cvc</label>
                                            </div>
                                        </div>
                                    </div>

                                </form>

                                <hr className="my-4" />

                                <div className="container p-0">
                                    { addresses.map(address => {
                                        if (address.default) {
                                            return (
                                                <React.Fragment key={address.id}>
                                                    <ul className='list_addresses'>
                                                        <li>Cep: {address.cep}</li>
                                                        <li>Estado: {address.state}</li>
                                                        <li>Múnicipio: {address.city}</li>
                                                        <li>Bairro: {address.district}</li>
                                                        <li>Rua: {address.street}</li>
                                                        <li>Número: {address.number}</li>
                                                    </ul>
                                                </React.Fragment>
                                            )
                                        }
                                    })}
                                    
                                    {addresses.length === 0 && <button className='p-0 text-white w-100 text-center bg-dark border border-dark' onClick={openModalAddresses}><strong>Adicione um endereço</strong></button>}
                                    
                                </div>

                                <hr className="my-4" />

                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Total</p>
                                    <p className="mb-2">R${total}</p>
                                </div>

                                <div className="d-flex justify-content-between">
                                    <p className="mb-2">Envio</p>
                                    <p className="mb-2">R${priceDeliveryAddressDefault}</p>
                                </div>

                                <button type="button" className="btn bg-white btn-lg">
                                    <div className="d-flex justify-content-between">
                                        <span>Comprar<i className="fas fa-long-arrow-alt-right ms-2"></i></span>
                                    </div>
                                </button>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </>
    );

}