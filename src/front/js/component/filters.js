import React, {useContext, useState, useEffect  } from "react";
import { Context, } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import "../../styles/filters.css";
import { FilterRange } from "./filterRange.js";
import { FilterKm } from "./filterPrice";
import { FilterBrands } from "./filterBrands";
import { FilterYear } from "./filterYear";

export const Filters = () => {
  const [rangeValues, setRangeValues] = useState([0, 50000]);

  const handleRangeChange = (newValues) => {
    setRangeValues(newValues);

  }


 
  





  
    return (
        <>
        <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          Ajusta tus filtros de búsqueda
        </a>
    
      
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h4 class="offcanvas-title" id="offcanvasExampleLabel">Filtrar búsqueda</h4>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
  

         
        <FilterBrands />



    <FilterRange />  

    <div className="py-5">
    
    <h4>
      Estado
    </h4>
    <div className="ms-5">
    <div class="form-check p-3 ">
            <input class="form-check-input " type="checkbox" value="" id="flexCheckDefault"/>
            <label class="form-check-label text-start d-flex ps-3 pt-2" for="flexCheckDefault">
              Nuevo
            </label>
          </div>
      
          <div class="form-check p-3 ">
            <input class="form-check-input  " type="checkbox" value="" id="flexCheckDefault"/>
            <label class="form-check-label text-start d-flex ps-3 pt-2" for="flexCheckDefault">
              Seminuevo
            </label>
          </div>
       
          </div>


  

   
      <FilterYear />




  </div>

  <div className="my-5">
    
    <h4>
      Combustible
    </h4>
    <div className="ms-5">
    
    <div class="form-check p-3 ">
            <input class="form-check-input " type="checkbox" value="" id="flexCheckDefault"/>
            <label class="form-check-label text-start d-flex ps-3 pt-2" for="flexCheckDefault">
              Diésel
            </label>
          </div>
      
          <div class="form-check p-3 ">
            <input class="form-check-input  " type="checkbox" value="" id="flexCheckDefault"/>
            <label class="form-check-label text-start d-flex ps-3 pt-2" for="flexCheckDefault">
              Gasolina
            </label>
          </div>
       
          <div class="form-check p-3 ">
            <input class="form-check-input  " type="checkbox" value="" id="flexCheckDefault"/>
            <label class="form-check-label text-start d-flex ps-3 pt-2" for="flexCheckDefault">
              Híbrido
            </label>
          </div>
       
          <div class="form-check p-3 ">
            <input class="form-check-input  " type="checkbox" value="" id="flexCheckDefault"/>
            <label class="form-check-label text-start d-flex ps-3 pt-2" for="flexCheckDefault">
              Eléctrico
            </label>
          </div>
       
          </div>

          </div>

          </div>


 
   
      <FilterKm/>


      <Link to ="/search-results" className="btn btn-primary mb-5">
        Buscar por filtros
      </Link>

        </div>
      </div>
      




    
      </>
)

}