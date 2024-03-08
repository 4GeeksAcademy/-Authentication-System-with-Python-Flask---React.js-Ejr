import React, { useState, useContext, useCallback } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../styles/searchbar.css';
import debounce from 'lodash.debounce';
import 'bootstrap/dist/js/bootstrap.bundle.min'; 

// Componente SearchBar lógica de búsqueda y resultados
const SearchBar = () => {
    const [search, setSearch] = useState("");
    const { actions, store } = useContext(Context);

    // Función para realizar la búsqueda
    const performSearch = async (valor) => {
        if (valor.trim().length >= 3) {
            try {
                await actions.setBooks(valor);
            } catch (error) {
                console.error("Error en la búsqueda", error);
            }
        }
    };

    // Debounced search para la entrada en tiempo real
    const fetchDebounced = useCallback(debounce((valor) => {
        performSearch(valor);
    }, 500), [actions]);

    // Maneja el cambio en el campo de búsqueda y ejecuta la búsqueda debounced
    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearch(value);
        fetchDebounced(value);
    };

    return (
        <div>
            <div className="d-flex" role="search">
                <input 
                    className="form-control me-2"
                    type="search"
                    placeholder="Busca libros, autores, editoriales..."
                    aria-label="Search"
                    value={search}
                    onChange={handleSearchChange}
                />
                <button className="btn btn-outline-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSearchResults" aria-expanded="false" aria-controls="collapseSearchResults">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
            <div className="collapse" id="collapseSearchResults">
                <div className="card card-body">
                    {search.trim() && store.resultados.length > 0 ? (
                        <ul>    
                            {store.resultados.map((resultado, index) => (
                                <li className="list-group-item" key={index}>{resultado.title}</li>
                            ))}
                        </ul>
                    ) : <p>No se encontraron resultados.</p>}
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
