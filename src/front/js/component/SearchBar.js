import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Resultados } from "./resultados";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../styles/searchbar.css'; 

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false); // Estado para controlar la visibilidad de Resultados
    const { store, actions } = useContext(Context);

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        if (!event.target.value.trim()) {
            setShowResults(false); // Si el input está vacío, no mostrar Resultados
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (search.trim()) {
            setShowResults(true); // Mostrar Resultados cuando se envíe el formulario
        }
    };

    return (
        <form onSubmit={handleOnSubmit} className="d-flex" role="search">
            <input 
                className="form-control me-2"
                type="search"
                placeholder="Busca libros, autores, editoriales y más..."
                aria-label="Search"
                value={search}
                onChange={handleSearchChange}
            />
            <button className="btn btn-outline-success" type="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            {showResults && <Resultados valor={search} />}
        </form>
    );
}

export default SearchBar;
