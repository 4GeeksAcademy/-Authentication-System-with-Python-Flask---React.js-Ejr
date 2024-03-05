import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => {
    return (
        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
            <li className="nav-item"><Link className="nav-link" to="/recomendaciones">Recomendaciones</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/autores">Autores</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/generos">Géneros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/best-seller">Best Seller</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/mas-buscados">Más Buscados</Link></li>
        </ul>
    );
}

export default NavLinks;
