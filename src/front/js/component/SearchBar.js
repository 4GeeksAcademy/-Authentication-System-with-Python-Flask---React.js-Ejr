import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";


export const SearchBar = (props) => {
    
    return (
        <div className="input-group" style={{ width: "230px" }}>
            <input
                className="form-control border-end-0 border"
                type="text"
                placeholder="Search by title or author" 
                value={props.searchTerm}
                onChange={props.handleSearch}
            />
            <span className="input-group-append">
                <button
                    className="btn btn-outline-secondary border-start-0 border-bottom-0 border ms-n5"
                    type="button"
                    onClick={props.handleSearch} 
                >
                    <i className="fa fa-search"></i>
                </button>
            </span>
        </div>
    )
}