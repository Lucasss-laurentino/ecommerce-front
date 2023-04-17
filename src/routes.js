import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreateUser } from './Components/CreateUser/Index';
import Login from './Components/Login/Index';
import { PageDefault } from './Components/PageDefault/Index';
import { CategoryProvider } from './Contexts/CategoryContext';
import { CreateUserProvider } from './Contexts/CreateUserContext';
import { LoginProvider } from './Contexts/LoginContext';
import { MenuContextProvider } from './Contexts/MenuContext';
import { ProductProvider } from './Contexts/ProductContext';
import { SubCategoryProvider } from './Contexts/SubCategoryContext';
import { Vitrine } from './Page/Vitrine/Index';

export default function AppRoutes() {

    return (
        <CreateUserProvider>
            <LoginProvider>
                <MenuContextProvider>
                    <CategoryProvider>
                        <SubCategoryProvider>
                            <ProductProvider>
                            <Router>
                                <Routes>
                                    <Route path='/' element={<PageDefault />}>
                                        <Route path='/' element={<Vitrine />} />
                                        <Route path='login' element={<Login />} />
                                        <Route path='createUser' element={<CreateUser />} />
                                    </Route>
                                </Routes>
                            </Router>
                            </ProductProvider>
                        </SubCategoryProvider>
                    </CategoryProvider>
                </MenuContextProvider>
            </LoginProvider>
        </CreateUserProvider>

    );

}