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
          Ajusta tus filtros de búsqueda
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


        <div className="p-5">
      <h4>Precio</h4>
      <Range
        values={rangePrice}
        min={0}
        max={50000}
        step={300}
        onChange={handlePriceChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "6px",
              display: "flex",
              width: "100%"
            }}
          >
            <div 
              className="py-2"
              ref={props.ref}
              style={{
                height: "6px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: rangePrice,
                  colors: ["#ccc", "#548BF4", "#ccc"],
                  min: 0,
                  max: 50000
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "16px",
              width: "16px",
              borderRadius: "50%",
              backgroundColor: "#FFF",
              boxShadow: "0px 2px 6px #AAA"
            }}
          />
        )}
      />
      <p className="py-3">
        Rango de precio entre {rangePrice[0]} y {rangePrice[1]}
      </p>
    </div>

      

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


  

   
          <div className="p-5">
      <h4>Año de fabricación</h4>
      <Range
        values={rangeYears}
        min={1980}
        max={2023}
        step={1}
        onChange={handleYearsChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "6px",
              display: "flex",
              width: "100%"
            }}
          >
            <div 
              className="py-2"
              ref={props.ref}
              style={{
                height: "6px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: rangeYears,
                  colors: ["#ccc", "#548BF4", "#ccc"],
                  min: 1980,
                  max: 2023
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "16px",
              width: "16px",
              borderRadius: "50%",
              backgroundColor: "#FFF",
              boxShadow: "0px 2px 6px #AAA"
            }}
          />
        )}
      />
      <p className="py-3">
       Fabricación entre {rangeYears[0]} y {rangeYears[1]} 
      </p>
    </div>




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


 
   
          <div className="p-5">
      <h4>Kilometraje</h4>
      <Range
        values={rangeKm}
        min={0}
        max={300000}
        step={1500}
        onChange={handleKmChange}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "6px",
              display: "flex",
              width: "100%"
            }}
          >
            <div 
              className="py-2"
              ref={props.ref}
              style={{
                height: "6px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values: rangeKm,
                  colors: ["#ccc", "#548BF4", "#ccc"],
                  min: 0,
                  max: 300000
                }),
                alignSelf: "center"
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "16px",
              width: "16px",
              borderRadius: "50%",
              backgroundColor: "#FFF",
              boxShadow: "0px 2px 6px #AAA"
            }}
          />
        )}
      />
      <p className="py-3">
       Entre {rangeKm[0]} Kms y {rangeKm[1]} Kms
      </p>
    </div>


      <Link to ="/search-results" className="btn btn-primary mb-5">
        Buscar por filtros
      </Link>

        </div>
      </div>
      




    
      </>
)

}