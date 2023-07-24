import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import "../../styles/filters.css";
import { Range, getTrackBackground } from "react-range";


export const Filters = (props) => {
  const { store, actions } = useContext(Context);

  const [visibleBrands, setVisibleBrands] = useState(3);
  const totalBrands = store.allBrands.length;
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [showLessButton, setShowLessButton] = useState(false);
  const [vehicleType, setVehicleType] = useState("COCHE");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [rangePrice, setRangePrice] = useState([0, 50000]);
  const [year, setYear] = useState([1980, 2023]);
  const [km, setKm] = useState([0, 50000]);

  const handleKmChange = (newKm) => {
    setKm(newKm);

  }
  

  const handleYearChange = (newYear) => {
    setYear(newYear);

  }


  const handlePriceChange = (newPrice) => {
    setRangePrice(newPrice);
  }


  const handleShowMore = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 3);
    if (visibleBrands + 3 >= totalBrands) {
      setShowMoreButton(false);
    }
    if (!showLessButton) {
      setShowLessButton(true);
    }
  };

  const handleShowLess = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands - 3);
    if (visibleBrands - 3 <= 3) {
      setShowLessButton(false);
    }
    if (!showMoreButton) {
      setShowMoreButton(true);
    }
  };

  const handleOnBrandChange = (brandId) => {
    setSelectedBrands((prevSelectedBrands) => {
      if (prevSelectedBrands.includes(brandId)) {
        // Desmarcar la marca si ya estaba seleccionada
        return prevSelectedBrands.filter((id) => id !== brandId);
      } else {
        // Marcar la marca si no estaba seleccionada
        return [...prevSelectedBrands, brandId];
      }
    });
  };
  


  const renderBrands = () => {
    let brandsToShow = [];
    if (vehicleType === "COCHE") {
      brandsToShow = store.allBrands.slice(0, 29);
    } else if (vehicleType === "MOTO") {
      brandsToShow = store.allBrands.slice(29);
    }




  
    return (
      <ul>
        {brandsToShow.slice(0, visibleBrands).map((brand, index) => {
          return (
            <li key={brand.id}>
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={brand.name}
                  id={`flexCheckDefault${index}`}
                  checked={selectedBrands.includes(brand.id)}
                  onChange={() => handleOnBrandChange(brand.id)}
                />
                <label className="form-check-label" htmlFor={`flexCheckDefault${index}`}>
                  {brand.name}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };
  





  const handleOnSubmit = async (e) => {
    e.preventDefault();
    props.setIsFilter(true);
    props.setDataFilter([]);
  
    const queryParams = [];
    if (selectedBrands.length > 0) {
      queryParams.push(`brand_id=${selectedBrands.join(",")}`);
    }
    if (vehicleType !== "") {
      queryParams.push(`vehicle_type=${vehicleType}`);
    }
    
    queryParams.push(`min_price=${rangePrice[0]}`);
    queryParams.push(`max_price=${rangePrice[1]}`);
    queryParams.push(`min_year=${year[0]}`);
    queryParams.push(`max_year=${year[1]}`);
    queryParams.push(`min_km=${km[0]}`);
    queryParams.push(`max_km=${km[1]}`);

    const offcanvas = document.getElementById("offcanvasExample");
    const offcanvasBootstrap = bootstrap.Offcanvas.getInstance(offcanvas);
    offcanvasBootstrap.hide();
  

    const queryString = queryParams.join('&');
    const url = `${process.env.BACKEND_URL}api/search-by/filter?${queryString}`;

    try {
     const brand_id = selectedBrands.join(",")
     const vehicle_id = vehicleType
     const min_price = rangePrice[0]
     const max_price = rangePrice[1]
     const min_year = year[0]
     const max_year = year[1]
     const min_km = km[0]
     const max_km = km[1]


     actions.getFilteredProducts(brand_id, vehicle_id, min_price, max_price, min_year, max_year, min_km, max_km)

     } 
     catch(error) { (console.error('Error nuevo'))}

  }


  useEffect(() => {
    actions.getAllBrands()

  }, [])





  return (
    <>
      <a className="btn btn-primary jello-vertical buttonFilter" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
       
      <i className="fa-solid fa-sliders"></i>
      </a>

      <form onSubmit={handleOnSubmit}>
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className="offcanvas-header">
            <h4 className="offcanvas-title" id="offcanvasExampleLabel">
              Filtrar búsqueda
            </h4>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <div>
            <div>
  <h4>Vehículo</h4>
  <ul>
    <li>
      <div className="form-check p-3">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault1"
          checked={vehicleType === "COCHE"}
          onChange={() => setVehicleType("COCHE")}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault1">
          Coche
        </label>
      </div>
    </li>
    <li>
      <div className="form-check p-3">
        <input
          className="form-check-input"
          type="radio"
          name="flexRadioDefault"
          id="flexRadioDefault2"
          checked={vehicleType === "MOTO"}
          onChange={() => setVehicleType("MOTO")}
        />
        <label className="form-check-label" htmlFor="flexRadioDefault2">
          Moto
        </label>
      </div>
    </li>
  </ul>
</div>


              <div>
                <h4>Marcas</h4>
                {renderBrands()}
                {totalBrands > 3 && (
                  <>
                    {showMoreButton ? (
                      <div className="m-auto d-flex justify-content-end me-5">
                        <button className="nav-link me-5 text-primary" style={{"fontSize": "16px"}} onClick={handleShowMore}>
                          Ver más
                        </button>
                      </div>
                    ) : (
                      showLessButton && (
                        <button
                          style={{ width: 38, height: 35, background: "#0F4C75", borderRadius: 8 }}
                          className="nav-link btn-plus btn_mucho mb-2 ms-4"
                          onClick={handleShowLess}
                        >
                          <i className="fa-solid fa-window-minimize m-auto" />
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
        step={100}
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





<div className="p-5">
      <h4>Año de fabricación</h4>
      <Range
        values={year}
        min={1980}
        max={2023}
        step={1}
        onChange={handleYearChange}
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
          values: year, // <-- Aquí debe ser 'year' en lugar de 'rangeValues'
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
       Fabricación entre {year[0]} y {year[1]} 
      </p>
    </div>



    <div className="p-5">
      <h4>Kilometraje</h4>
      <Range
        values={km}
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
                  values: km,
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
       Entre {km[0]} Kms y {km[1]} Kms
      </p>
    </div>








     </div>

            <button className="btn btn-primary my-5">Buscar por filtros</button>
          </div>
        </div>
      </form>
    </>
  );
};
