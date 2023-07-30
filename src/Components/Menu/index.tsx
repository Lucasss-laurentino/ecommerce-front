import { useContext, useState } from 'react';
import './Menu.css';
import { MenuContext } from '../../Contexts/MenuContext';
import { LoginContext } from '../../Contexts/LoginContext';
import { Link } from 'react-router-dom';
import { AddressContext } from '../../Contexts/AddressContext';
import { ModalAddress } from '../ModalAddress/Index';
import ModalCategory from '../ModalCreateCategory/Index';
import { ModalCreateProduct } from '../ModalCreateProduct/Index';
import { ModalCreateSubCategory } from '../ModalCreateSubCategory/Index';

export const Menu = () => {

    const { menu, setMenu } = useContext(MenuContext);

    const { user, logout } = useContext(LoginContext)

    const { modalAddresses, setModalAddresses } = useContext(AddressContext);

    const [modalSubCategory, setModalSubCategory] = useState<boolean>(false);

    const [modalCreateProduct, setModalCreateProduct] = useState<boolean>(false);

    const [modalCategory, setModalCategory] = useState<boolean>(false);

    return (

        <>

            <ModalCategory
                modalCategory={modalCategory}
                setModalCategory={() => setModalCategory(false)}
            />

            <ModalCreateSubCategory
                modalSubCategory={modalSubCategory}
                setModalSubCategory={() => setModalSubCategory(false)}
            />

            <ModalCreateProduct
                modalCreateProduct={modalCreateProduct}
                setModalCreateProduct={() => setModalCreateProduct(false)}
            />

            <ModalAddress
                modalAddress={modalAddresses}
                setModalAddress={() => setModalAddresses(false)}

            />

            {/* Menu */}

            <div className="div-menu-user">
                <div className='div-lista-menu'>
                    <ul className='lista-menu'>
                        { /* Icone Login */}
                        {!user &&
                            <li className={menu ? "item-lista-menu item1" : "item-lista-menu-escondida item1"}>
                                <Link to='/login' className='texto-responsivo texto-login'>
                                    <p className='m-0'>Login</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person icon-responsive" viewBox="0 0 16 16">
                                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                                    </svg>
                                </Link>
                            </li>
                        }
                        { /* Icone itens */}
                        {user &&
                            <>
                                <li className="">

                                    <Link to='/cart' className='' onClick={() => setMenu(false)}>
                                        <p className=''>Meus itens</p>

                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                                            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                                        </svg>
                                    </Link>
                                </li>
                                <li className="">
                                    <a href='#' className='' onClick={() => setModalAddresses(true)}>
                                        <p className=''>Meus Endereços</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-geo" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z" />
                                        </svg>
                                    </a>
                                </li>
                                {user.adm ?
                                    <>
                                        <li className="">
                                            <button className='' onClick={() => setModalCategory(true)}>
                                                <p className=''>Cadastrar categoria</p>
                                            </button>
                                        </li>
                                        <li className="">
                                            <button className='' onClick={() => setModalSubCategory(true)}>
                                                <p className=''>Cadastrar sub categoria</p>
                                            </button>
                                        </li>
                                        <li className="">
                                            <button className='' onClick={() => setModalCreateProduct(true)}>
                                                <p className=''>Cadastrar Produto</p>
                                            </button>
                                        </li>
                                    </>
                                    : ''
                                }
                                <li className="">
                                    <button onClick={logout} className=''>
                                        <p className=''>Sair</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                        </svg>
                                    </button>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>

            {/* End menu */}

        </>

    );

}