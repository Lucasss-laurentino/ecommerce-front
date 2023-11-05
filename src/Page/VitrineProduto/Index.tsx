import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../../http/http";
import { Carrousel } from "../../Components/Carrousel/Index";
import Product from "../../types/Product";
import { LoginContext } from "../../Contexts/LoginContext";
import { ProductContext } from "../../Contexts/ProductContext";
import { ModalProductInfoContext } from "../../Contexts/ModalProductInfoContext";
import { ModalProductInfo } from "../../Components/ModalProductInfo/Index";
import React from "react";
import './VitrineProduto.css';
import axios from "axios";

export default function VitrineProduto() {

    const { subCategoryName } = useParams();
    const { user } = useContext(LoginContext);
    const { deleteProduct } = useContext(ProductContext);
    const { setModalProductInfo, setProductInfo } = useContext(ModalProductInfoContext);
    const [productsPaginate, setProductsPaginate] = useState<Product[]>([]);

    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');

    const [pages, setPages] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        axios.get('http://localhost:8000/getProductsSubCategory').then((response) => {

            console.log(response.data)
            /*
            setProductsPaginate([...response.data.data]);
            setNextUrl(response.data.next_page_url);
            setTotal(response.data.last_page);

            const arrayPages: any = [];
            for (let cont = 1; cont <= response.data.last_page; cont++) {
                arrayPages.push(cont);
            }

            setPages(arrayPages);
            */
        })

    }, [subCategoryName]);

    const openModal = (product: Product) => {

        setModalProductInfo(true);
        setProductInfo(product);

    }

    const nextPage = () => {

        http.get(`${nextUrl}`).then((response) => {
            setProductsPaginate([...response.data.data]);
            setNextUrl(response.data.data.next_page_url);
            setPrevUrl(response.data.prev_page_url);
        })


        const obj = document.getElementById('titleSubCategory')?.scrollIntoView({ behavior: "smooth"});


    }

    const prevPage = () => {

        http.get(`${prevUrl}`).then((response) => {
            setProductsPaginate([...response.data.data]);
            setNextUrl(response.data.next_page_url);
            setPrevUrl(response.data.prev_page_url);
        })

        const obj = document.getElementById('titleSubCategory')?.scrollIntoView({ behavior: "smooth"});

    }

    const customUrl = (page: number) => {

        http.get(`http://127.0.0.1:8000/api/getProductsSubCategory/Vestidos?page=${page}`).then((response) => {
            setProductsPaginate([...response.data.data]);
            setNextUrl(response.data.next_page_url);
            setPrevUrl(response.data.prev_page_url);
        })

        const obj = document.getElementById('titleSubCategory')?.scrollIntoView({ behavior: "smooth"});

    }

    return (
        <>

            <Carrousel />

            <ModalProductInfo />

            <div className="container mt-5 font-garlicha">
                <h1 id="titleSubCategory" className="">{subCategoryName}</h1>
            </div>

            <div className="container">
                <ul className="d-flex flex-wrap p-0 justify-content-center">
                    {productsPaginate && productsPaginate.map(product => {
                        return (
                            <React.Fragment key={product._id}>
                                <li className="list-group-item card-product col-3 text-center m-2">
                                    <div className="card-header bg-white">
                                        {user?.adm ?
                                            <div className="d-flex justify-content-end">
                                                <button className='color border border-white bg-white'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                    </svg>
                                                </button>
                                                <button type='button' className='color border border-white bg-white' onClick={() => deleteProduct(product._id)}>
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
                                        <p className="card-title color text-truncate text-responsive">{product?.name}</p>
                                        <p className="card-text color text-responsive">R$ {product?.price}</p>
                                    </div>
                                    <div className="background-button-product">
                                        <button className="py-2 text-white bg-dark w-100 btn-responsive" onClick={() => openModal(product)}><strong>Ver produto</strong></button>
                                    </div>
                                </li>
                            </React.Fragment>
                        );
                    })}
                </ul>
                <div className="container d-flex justify-content-center">
                    <nav aria-label="...">
                        <ul className="pagination">
                            <li className='page-item'>
                                <a className="page-link text-dark" onClick={prevPage}>Anterior</a>
                            </li>
                            {pages.map((page) => {
                                return (
                                    <React.Fragment key={page}>
                                        <li className="page-item">
                                            <a className="page-link text-dark" onClick={() => customUrl(page)}>{page}</a>
                                        </li>
                                    </React.Fragment>);
                            })}
                            <li className="page-item">
                                <a className="page-link text-dark" onClick={nextPage}>Próximo</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

        </>
    );
}