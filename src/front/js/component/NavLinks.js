import React from 'react';

// Navegación de libros
const NavLinks = () => {
    return (
        <ul className="nav-links">
            <li><a href="/recomendaciones">Recomendaciones</a></li>
            <li><a href="/autores">Autores</a></li>
            <li><a href="/generos">Géneros</a></li>
            {/* Más enlaces*/}
        </ul>
    );
}

export default NavLinks;