import React, {useContext, useState, useEffect  } from "react";
import { Context, } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import "../../styles/filters.css";
import { Range, getTrackBackground } from "react-range";

export const Filters = (props) => {

  const [rangeKm, setRangeKm] = useState([0, 50000]);
  const handleKmChange = (newKm) => {
    setRangeKm(newKm);
  }

  const [rangeYears, setRangeYears] = useState([1980, 2023]);
  const handleYearsChange = (newYears) => {
    setRangeYears(newYears);
  }


  const [rangePrice, setRangePrice] = useState([0, 50000]);
  const handlePriceChange = (newPrice) => {
    setRangePrice(newPrice);
  }



  const [visibleBrands, setVisibleBrands] = useState(3);
  const totalBrands = 20;
  const [showMoreButton, setShowMoreButton] = useState(true);

  const handleShowMore = () => {
    setVisibleBrands(prevVisibleBrands => prevVisibleBrands + 3);
    if (visibleBrands + 3 >= totalBrands) {
      setShowMoreButton(false);
    }
  };

  const handleShowLess = () => {
    setVisibleBrands(3);
    setShowMoreButton(true);
  };

  const renderBrands = () => {
    const brands = [];
    for (let i = 1; i <= totalBrands; i++) {
      if (i <= visibleBrands) {
        brands.push(
          <li key={i}>
            <div className="form-check p-3">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={`flexCheckDefault${i}`}
              />
              <label className="form-check-label" htmlFor={`flexCheckDefault${i}`}>
                Marca {i}
              </label>
            </div>
          </li>
        );
      }
    }
    return brands;
  };
 
  
const handleOnSubmit = (e) => {
  e.preventDefault()
// hacer el fetch para los filtros
  props.setIsFilter(true)
  props.setDataFilter([]) // meter los datos que me lleguen del fetch, se puede qutiar el array
}





  
    return (
        <>
        <a class="btn btn-primary jello-vertical" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          <i class="fa-solid fa-filter"/>
        </a>
    
<form onSubmit={handleOnSubmit}>
      
      <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h4 class="offcanvas-title" id="offcanvasExampleLabel">Filtrar búsqueda</h4>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
  
          <div>
      <h4>Vehículo</h4>
      <ul>
        <li>
      <div class="form-check p-3">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
          <label class="form-check-label" for="flexRadioDefault1">
            Coche
          </label>
        </div>
        </li>
        <li>
        <div class="form-check p-3">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
          <label class="form-check-label" for="flexRadioDefault2">
            Moto
          </label>
        </div>
        </li>
      </ul>
    </div>




         
          <div>
      <h4>Marcas</h4>
      <ul>{renderBrands()}</ul>
      {visibleBrands < totalBrands && (
        <>
          {showMoreButton ? (  
          
          <div className="m-auto d-flex justify-content-center">
             <button 
             style={{width: 38, height: 35, background: '#0F4C75', borderRadius: 8}}
             className="nav-link btn-plus m-auto"
             onClick={handleShowMore}>
             <i className="fa-solid fa-plus m-auto"></i>

              </button>
          </div>



          ) : (
            visibleBrands > 3 && (
            
              <button 
              style={{width: 38, height: 35, background: '#0F4C75', borderRadius: 8}}
              className="nav-link btn-plus btn_mucho mb-2 ms-4"
              onClick={handleShowLess}>
              <i className="fa-solid fa-window-minimize m-auto"></i>
 
               </button>
 
   
            )
          )}
        </>
      )}
    </div>


 

      

   </div>

      <button className="btn btn-primary my-5">
        Buscar por filtros
      </button>

        </div>
      </div>
      
      </form>



    
      </>
)

}