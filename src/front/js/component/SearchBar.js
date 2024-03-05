import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Resultados } from "./resultados";
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../../styles/searchbar.css'; 

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const { store, actions } = useContext(Context);

    const handleSearchChange = async (event) => {
        const value = event.target.value;
        setSearch(value);
        if (value.trim()) {
            try {
                const data = await actions.setBooks(value);
                setResults(data.docs.slice(0,6)); 
            } catch (error) {
                console.error("Error en la búsqueda:", error);
                setResults([]);
            }
        } else {
            setResults([]);
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
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={handleSearchChange}
            />
            <button className="btn btn-outline-success" type="submit"><i className="bi bi-search-heart"></i>
            </button>
            <Resultados valor={search} />
        </form>
    );
}

export default SearchBar;