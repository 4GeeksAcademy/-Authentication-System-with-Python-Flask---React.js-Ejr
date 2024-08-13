import React from 'react'
import Searchbar from "./searchbar.jsx"
import "../../styles/jumbotron.css";

export const Jumbotron = () => {
    return (
    <div class="p-5 mb-4 bg-body-tertiary jumbotron">
      <div class="container-fluid py-5 ms-5">
        <h5 class="fw-bold ms-5 mb-3 text-white">Busca qué hacer</h5>
        <div className="d-flex h-100 ms-4">
          <div className="search d-flex">
            <input className="search_input w-50" type="text" name="search" placeholder="Destino/@username"/>
            <input className="search_input w-25 me-auto" type="number" min={1} name="days" placeholder="Duración"/>
            <a href="#" className="search_icon"><i className="fa fa-search"></i></a>
          </div>
        </div>
      </div>
    </div>
    )
}