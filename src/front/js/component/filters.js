import React, {useContext, useState, useEffect  } from "react";
import { Context, } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import "../../styles/filters.css"
import { Range, getTrackBackground } from "react-range";
import { FilterRange } from "./filterRange.js";
import { FilterKm } from "./filterPrice";

export const Filters = () => {
  const [rangeValues, setRangeValues] = useState([0, 50000]);

  const handleRangeChange = (newValues) => {
    setRangeValues(newValues);

  }


  const generateYearOptions = () => {
    const yearOptions = [];

    for (let i = 2023; i > 1980; i--) {
      yearOptions.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return yearOptions;
  };

    return (
        <>
        <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          Filtros
        </a>
    
      
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h4 class="offcanvas-title" id="offcanvasExampleLabel">Filtrar búsqueda</h4>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
  

         
<div>

  <h4>Marcas</h4>
  <ul>

        <li>
          <div class="form-check p-3">
            <input class="form-check-input " type="checkbox" value="" id="flexCheckDefault1"/>
            <label class="form-check-label" for="flexCheckDefault1">
              Marca 1
            </label>
          </div>
        </li>
        <li>
          <div class="form-check p-3">
            <input class="form-check-input " type="checkbox" value="" id="flexCheckDefault2"/>
            <label class="form-check-label" for="flexCheckDefault2">
              Marca 2
            </label>
          </div>
        </li>
        <li>
          <div class="form-check p-3">
            <input class="form-check-input " type="checkbox" value="" id="flexCheckDefault3"/>
            <label class="form-check-label" for="flexCheckDefault3">
              Marca 3
            </label>
          </div>
        </li>
        <li>
          <div class="form-check p-3">
            <input class="form-check-input " type="checkbox" value="" id="flexCheckDefault4"/>
            <label class="form-check-label" for="flexCheckDefault4">
              Marca 4
            </label>
          </div>
        </li>

          </ul>
          <button className="btn btn-primary">
            Mostrar más
          </button>
    </div>



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


  </div>



    <div className="py-5">
    
    <h4>
      Año de fabricación
    </h4>
      <select className="form-select" size="3" aria-label="size 3 select example">
       {generateYearOptions()}
      </select>


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




        </div>
      </div>
      
      </>
)

}