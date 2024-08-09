import React from 'react'
import "../../styles/searchbar.css";

const Searchbar = () => {
  return (
    <>

<div className="container h-100">
      <div className="d-flex justify-content-center h-100">
        <div className="search d-flex">
          <input className="search_input w-50" type="text" name="" placeholder="Destino/@username"/>
          <input className="search_input w-25 me-auto" type="number" name="" placeholder="Duración"/>
          <a href="#" className="search_icon "><i className="fa fa-search"></i></a>
        </div>
      </div>
    </div>


    </>
  )
}

export default Searchbar