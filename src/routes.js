import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Cart } from './Components/Cart/Index';
import { CreateUser } from './Components/CreateUser/Index';
import Login from './Components/Login/Index';
import { PageDefault } from './Components/PageDefault/Index';
import { AddressProvider } from './Contexts/AddressContext';
import { CartProvider } from './Contexts/CartContext';
import { CategoryProvider } from './Contexts/CategoryContext';
import { CreateUserProvider } from './Contexts/CreateUserContext';
import { LoginProvider } from './Contexts/LoginContext';
import { MenuContextProvider } from './Contexts/MenuContext';
import { ProductProvider } from './Contexts/ProductContext';
import { SizeProvider } from './Contexts/SizeContext';
import { SubCategoryProvider } from './Contexts/SubCategoryContext';
import { Vitrine } from './Page/Vitrine/Index';
import VitrineProduto from './Page/VitrineProduto/Index';
import { ModalProductInfoProvider } from './Contexts/ModalProductInfoContext';
import { Password_reset } from './Components/Password_reset/Index';
import { CartaoContextProvider } from './Contexts/CartaoContext';

export default function AppRoutes() {

    return (
        <CreateUserProvider>
            <LoginProvider>
                <MenuContextProvider>
                    <CategoryProvider>
                        <SubCategoryProvider>
                            <ProductProvider>
                                <SizeProvider>
                                    <AddressProvider>
                                        <CartProvider>
                                            <ModalProductInfoProvider>
                                                <CartaoContextProvider>
                                                    <Router>
                                                        <Routes>
                                                            <Route path='/' element={<PageDefault />}>
                                                                <Route path='/' element={<Vitrine />} />
                                                                <Route path='login' element={<Login />} />
                                                                <Route path='createUser' element={<CreateUser />} />
                                                                <Route path='/cart' element={<Cart />} />
                                                                <Route path='/:subCategoryName' element={<VitrineProduto />}/>
                                                                <Route path='password_reset' element={<Password_reset />} />
                                                            </Route>
                                                        </Routes>
                                                    </Router>
                                                </CartaoContextProvider>
                                            </ModalProductInfoProvider>
                                        </CartProvider>

                                    </AddressProvider>
                                </SizeProvider>
                            </ProductProvider>
                        </SubCategoryProvider>
                    </CategoryProvider>
                </MenuContextProvider>
            </LoginProvider>
        </CreateUserProvider>

    );

}