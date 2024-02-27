import React from 'react';

// Barra de búsqueda
const SearchBar = () => {
    return (
        <div className="search-bar">
            <input
                className="search-text"
                aria-label="Buscar"
                placeholder="Buscar libros, autores, géneros..."
                type="text"
            />
            <button className="search-clear">Limpiar</button>
            <button className="search-submit">Buscar</button>
        </div>
    );
}

export default SearchBar;