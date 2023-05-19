import './CardProduct.css';
import Product from "../../types/Product";
import { useContext, useState } from 'react';
import { ModalProductInfo } from '../ModalProductInfo/Index';
import { ProductContext } from '../../Contexts/ProductContext';
import { LoginContext } from '../../Contexts/LoginContext';


interface Props {

    product: Product,

}

export const Card_product = ({ product }: Props) => {

    const [modalProductInfo, setModalProductInfo] = useState<boolean>(false);

    const { deleteProduct } = useContext(ProductContext);

    const { user } = useContext(LoginContext);

    const [productInfoState, setProductInfoState] = useState<Product | undefined>();

    const productInfo = (product: Product) => {

        setProductInfoState(product);

        setModalProductInfo(true)

    }

    return (

        <>

            <ModalProductInfo
                modalProductInfo={modalProductInfo}
                setModalProductInfo={() => setModalProductInfo(false)}
                productInfo={product}
            />


            <div className="card-product col-7 col-sm-4 col-md-3 col-lg-3 text-center m-2">
                <div className="card-header bg-white">
                    {user?.adm ?
                    <div className="d-flex justify-content-end">
                        <button className='color border border-white bg-white'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </button>
                        <button type='button' className='color border border-white bg-white' onClick={() => deleteProduct(product.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg>
                        </button>
                    </div>
                    : ''
                    }
                </div>

                <div className="ratio ratio-1x1">
                    <img className="card-img-top" src={product?.imageOne} alt="Card image cap" />
                </div>
                <div className="card-body my-2">
                    <p className="card-title color">{product?.name}</p>
                    <p className="card-text color">R$ {product?.price}</p>
                </div>
                <div className="background-button-product">
                    <button className="btn btn-sm py-2 text-white bg-dark w-100" onClick={() => productInfo(product)}><strong>Ver produto</strong></button>
                </div>
            </div>
        </>

    );

}