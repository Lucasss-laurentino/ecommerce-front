import { Link } from 'react-router-dom';
import './NavBar.css';
import { useContext } from 'react';
import { MenuContext } from '../../Contexts/MenuContext';


export const NavBar = () => {

    const { menu, setMenu } = useContext(MenuContext);

     /* Mostrar ou esconder menu */
     const animationMenu = () => {

        setMenu(!menu);

    }
    
    return (
        <>
        
            <div className="linha-nav-bar">
                <div className="logo">
                    <Link to='/' className="title-responsive font-garlicha">Barra serena</Link>
                </div>
                <div className="div-menu">
                    <button className='btn-menu' onClick={animationMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={menu ? "bi bi-x-lg anime" : "bi bi-list anime-reverse"} viewBox="0 0 16 16">
                            <path
                                fillRule="evenodd"
                                d={menu ? "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" : "M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"}
                            />
                            {/* prorpiedades onde é verificado o estado de menu é apenas para mudar classes e path do icone */}
                        </svg>
                    </button>
                </div>
            </div>
        
        </>
    );
}