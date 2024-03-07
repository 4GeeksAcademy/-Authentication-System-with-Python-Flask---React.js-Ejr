import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Resultados } from "./resultados";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../styles/searchbar.css'; 

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);
    const { store, actions } = useContext(Context);

    const handleSearchChange = async (event) => {
        const value = event.target.value;
        setSearch(value);
        if (value.trim()) {
           
            actions.setBooks(value); 
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
       
    };

    return (
        <form onSubmit={handleOnSubmit} className="d-flex" role="search">
            <input 
                className="form-control me-2"
                type="search"
                placeholder="Busca libros, autores, editoriales..."
                aria-label="Search"
                value={search}
                onChange={handleSearchChange}
            />
          <button className="btn btn-outline-success search-btn" type="submit">
    <FontAwesomeIcon icon={faMagnifyingGlass} /> 
</button>
            
            <Resultados valor={search} />
        </form>
    );
}

export default SearchBar;
