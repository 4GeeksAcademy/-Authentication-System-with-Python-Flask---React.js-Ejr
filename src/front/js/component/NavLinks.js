import React from 'react' ;
import { Link } from 'react-router-dom';
// Navegación de libros
const NavLinks = () => {
    return (
        <ul className="nav-links">
            <li><Link to="/recomendaciones">Recomendaciones</Link></li>
            <li><Link to="/autores">Autores</Link></li>
            <li><Link to="/generos">Géneros</Link></li>
            <li><Link to="/best-seller">Best Seller</Link></li>
            <li><Link to="/generos">Mas Buscados</Link></li>
            {/* Más enlaces*/}
        </ul>
    );
}

export default NavLinks;