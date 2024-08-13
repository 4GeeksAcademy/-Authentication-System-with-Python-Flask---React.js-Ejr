import React from 'react'
import Searchbar from "./searchbar.jsx"
import "../../styles/jumbotron.css";
import { Link } from 'react-router-dom';

export const Jumbotron = () => {
    return (
    <div class="p-5 mb-4 bg-body-tertiary jumbotron">
      <div class="container-fluid py-5 buscar">
        <h5 class="fw-bold mb-3 text-white">Busca qué hacer</h5>
        <div className="d-flex h-100">
          <div className="search d-flex">
            <input className="search_input w-50 mt-0" type="text" name="search" placeholder="Destino/@username"/>
            <input className="search_input w-25 mt-0 me-auto" type="number" min={1} name="days" placeholder="Duración"/>
            <Link to={'/search'}>
            {/* <a href="#" className="search_icon"><i className="fa fa-search"></i></a> */}
            <i className="fa fa-search"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
    )
}