import React, { useState, useContext, useEffect, useCallback } from "react";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner } from '@fortawesome/free-solid-svg-icons';
import '../../styles/searchbar.css'; 
import debounce from 'lodash.debounce';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { actions, store } = useContext(Context);

    useEffect(() => {
        if (search.trim().length >= 3) {
            setLoading(true);
            setIsMenuOpen(true);
            fetchDebounced(search);
        } else {
            setIsMenuOpen(false);
        }
    }, [search]);

    const performSearch = useCallback(async (valor) => {
        try {
            await actions.setBooks(valor);
        } catch (error) {
            console.error("Error en la búsqueda", error);
        } finally {
            setLoading(false);
        }
    }, [actions]);

    const fetchDebounced = useCallback(debounce((valor) => {
        performSearch(valor);
    }, 50), [performSearch]);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        performSearch(search);
    };

    return (
        <div className="position-relative search-bar"> 
            <form onSubmit={handleOnSubmit} className="d-flex" role="search">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Busca libros, autores, editoriales..."
                    aria-label="Search"
                    value={search}
                    onChange={handleSearchChange}
                />
                <button className="btn btn-outline-success search-btn" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <FontAwesomeIcon icon={loading ? faSpinner : faMagnifyingGlass} spin={loading} />
                </button>
            </form>
            {isMenuOpen && (
                <div className="collapse show" id="collapseSearchResults" style={{ position: 'absolute', zIndex: 1000, width: '100%', top: '100%' }}>
                    <div className="card card-body">
                        {loading ? <p>Buscando...</p> : search.trim() && store.resultados.length > 0 ? (
                            <ul>    
                                {store.resultados.map((resultado, index) => (
                                    <li className="list-group-item" key={index}>{resultado.title}</li>
                                ))}
                            </ul>
                        ) : <p>No se encontraron resultados.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
