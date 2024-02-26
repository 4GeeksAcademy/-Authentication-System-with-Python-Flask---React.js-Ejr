import React from 'react';
import Logo from './Logo'; 
import NavLinks from './NavLinks'; 
import SearchBar from './SearchBar'; 

// Barra de navegación
const NavBar = () => {
    return (
        <header className="navbar" aria-label="Barra de navegación" data-qa="header-nav-bar" id="header-main">
            <Logo />
            <SearchBar />
            <NavLinks />
        </header>
    );
}

export default NavBar;
