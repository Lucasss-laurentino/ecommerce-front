import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { CategoryContext } from '../../Contexts/CategoryContext';
import { LoginContext } from '../../Contexts/LoginContext';
import './PageDefault.css';
import { NavBar } from '../NavBar';
import { Menu } from '../Menu';
import { AddressContext } from '../../Contexts/AddressContext';

export const PageDefault = () => {

    const { validateToken} = useContext(LoginContext);
    const { getAddresses } = useContext(AddressContext);
    const { categories, getCategories, getCategoryDefault } = useContext(CategoryContext);

    useEffect(() => {

        validateToken();
        getCategories();
        getCategoryDefault();
        getAddresses();

    }, []);
    
    return (

        <>

            <NavBar />

            <Menu />

            <Outlet />

            {/* Footer */}

            <footer className="bottom-fixed">
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h4 className="text-white">Política & termos</h4>
                                <p>
                                    <a href="#" className="text-dark text-decoration-underline">Política de privacidade</a>
                                </p>
                                <p>
                                    <a href="#" className="text-dark text-decoration-underline">Termos de uso</a>
                                </p>
                            </div>
                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4 pt-4">
                                <h4 className="text-dark">Contato</h4>
                                <p className='text-dark'>
                                    contato@coisasdemulher.com
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className='text-center m-0 text-dark'>© 2022 Copyright: coisasdemulher.com</p>
                </section>
            </footer>

            {/* End footer */}

        </>

    );

}