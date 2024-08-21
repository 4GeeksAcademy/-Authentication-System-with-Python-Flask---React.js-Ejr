import React, { useState } from "react";
import { ListOffers } from "../component/ListOffers.jsx";
import "../../styles/TimeLine.css"

export const TimeLine = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filterTerm, setFilterTerm] = useState("");

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

    return (
        <>
            <div className="search-bar container my-3 d-flex justify-content-center">
                <input
                    type="text"
                    className=" form-control me-2"
                    placeholder="Buscar ofertas..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
                <button
                    className="btn btn-search"
                    onClick={handleSearchClick}
                >
                    Buscar
                </button>
            </div>
            <ListOffers searchTerm={filterTerm} />
        </>
    );
};
