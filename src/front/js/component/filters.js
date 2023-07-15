import React, {useContext, useState, useEffect  } from "react";
import { Context, } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import "../../styles/filters.css";
import { Range, getTrackBackground } from "react-range";

export const Filters = () => {

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
 
  





  
    return (
        <>
        <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
          <i class="fa-solid fa-filter"/>
        </a>
    
      
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
            <button className="btn buttonShowMore" onClick={handleShowMore}>
              <i class="fa-solid fa-plus" style={{"color": "#ffffff"}}/>
            </button>
          ) : (
            visibleBrands > 3 && (
              <button className="btn buttonShowMore" onClick={handleShowLess}>
                <i class="fa-solid fa-window-minimize" style={{"color": "#ffffff"}} />
              </button>
            )
          )}
        </>
      )}
    </div>


 

      

   </div>

      <Link to ="/search-results" className="btn btn-primary my-5">
        Buscar por filtros
      </Link>

        </div>
      </div>
      




    
      </>
)

}