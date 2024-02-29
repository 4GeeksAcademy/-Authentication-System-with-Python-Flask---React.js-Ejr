import React from 'react';
import Logo from './Logo'; 
import NavLinks from './NavLinks'; 
import SearchBar from './SearchBar'; 
import { Navbar } from 'react-bootstrap';

// Barra de navegación
export const NavBar = () => {
    return (
        
        <nav className="navbar bg-body-tertiary d-flex m-0 p-0" aria-label="Barra de navegación"
         data-qa="header-nav-bar" id="header-main">
            <div className="container-fluid">
                
                
                <Logo />
                <SearchBar />
                <NavLinks />
            </div>
         </nav>
    );
}

export default NavBar;
