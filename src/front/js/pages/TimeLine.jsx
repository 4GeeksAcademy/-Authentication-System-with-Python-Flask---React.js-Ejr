import React, { useState } from "react";
import { ListOffers } from "../component/CardListOffers.jsx";
import "../../styles/TimeLine.css";

export const TimeLine = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTerm, setFilterTerm] = useState(""); 
    const [filters, setFilters] = useState({ 
        plazo: "",
        salario: [0, 100000],
        searchText: "",
        fecha_publicacion: "",
        experience: []
    });

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchClick = () => {
        setFilterTerm(searchTerm);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchClick();
        }
    };

    const handleFiltersChange = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    return (
        <>
            <div className="container-list my-5">
                <div className="row">
                    <div className="col-12 text-center fw-bold text-muted header-box">
                        <h2 className="fw-bold">Construyendo un Futuro</h2>
                        <h3 className="fw-bold">
                            Encuentra aquí las mejores oportunidades para tu carrera
                        </h3>
                    </div>
                </div>
            </div>
            <div className="search-bar d-flex justify-content-center mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar ofertas..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
                <button className="btn btn-search ms-3" onClick={handleSearchClick}>
                    Buscar
                </button>
            </div>
            <div className="list-offers-container text-center">
                <ListOffers searchTerm={filterTerm} filters={filters} />
            </div>
        </>
    );
};


