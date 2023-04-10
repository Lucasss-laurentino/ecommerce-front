import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CreateUser } from './Components/CreateUser/Index';
import Login from './Components/Login/Index';
import { PageDefault } from './Components/PageDefault/Index';
import { CreateUserProvider } from './Contexts/CreateUserContext';
import { LoginProvider } from './Contexts/LoginContext';
import { MenuContext, MenuContextProvider } from './Contexts/MenuContext';
import { Vitrine } from './Page/Vitrine/Index';

export default function AppRoutes() {

    return (
        <CreateUserProvider>
            <LoginProvider>
                <MenuContextProvider>
                    <Router>
                        <Routes>
                            <Route path='/' element={<PageDefault />}>
                                <Route path='/' element={<Vitrine />} />
                                <Route path='login' element={<Login />} />
                                <Route path='createUser' element={<CreateUser />} />
                            </Route>
                        </Routes>
                    </Router>
                </MenuContextProvider>
            </LoginProvider>
        </CreateUserProvider>

    );

}