import React from "react";
import "../../styles/searchbar.css";
import { Link } from "react-router-dom";

const Searchbar = () => {
  return (
    <>
      <div className="container h-100">
        <div className="d-flex justify-content-center h-100">
          <div className="search d-flex">
            <input
              className="search_input w-50"
              type="text"
              name="search"
              placeholder="Destino/@username"
            />
            <input
              className="search_input w-25 me-auto"
              type="number"
              min={1}
              name="days"
              placeholder="Duración"
            />
            <Link to='/search' className="search_icon">
              <i className="fa fa-search"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Searchbar;
