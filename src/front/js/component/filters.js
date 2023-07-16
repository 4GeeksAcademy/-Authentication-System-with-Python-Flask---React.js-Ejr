import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import "../../styles/filters.css";


export const Filters = (props) => {
  const { store, actions } = useContext(Context);

  const [visibleBrands, setVisibleBrands] = useState(3);
  const totalBrands = store.allBrands.length;
  const [showMoreButton, setShowMoreButton] = useState(true);
  const [showLessButton, setShowLessButton] = useState(false);
  const [vehicleType, setVehicleType] = useState("COCHE");
  const [selectedBrand, setSelectedBrand] = useState(null);

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

  const renderBrands = () => {
    return (
      <ul>
        {store.allBrands.slice(0, visibleBrands).map((brand, index) => {
          return (
            <li key={brand.id}>
              <div className="form-check p-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={brand.name}
                  id={`flexCheckDefault${index}`}
                  checked={selectedBrand === brand.id}
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
    if (selectedBrand !== null) {
      queryParams.push(`brand_id=${selectedBrand}`);
    }
    if (vehicleType !== "") {
      queryParams.push(`vehicle_type=${vehicleType}`);
    }
    const queryString = queryParams.join('&');
    const url = `${process.env.BACKEND_URL}api/search-by/filter?${queryString}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Error al obtener los productos filtrados');
      }
      const data = await response.json();
      props.setStore({ filterProducts: data });
    } catch (error) {
      console.error('Error al obtener los productos filtrados:', error);
    }
  };
  
  
  
  
  
  

  useEffect(() => {
    actions.getAllBrands();
  }, []);





  return (
    <>
      <a class="btn btn-primary jello-vertical" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
        <i class="fa-solid fa-filter" />
      </a>

      <form onSubmit={handleOnSubmit}>
        <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div class="offcanvas-header">
            <h4 class="offcanvas-title" id="offcanvasExampleLabel">
              Filtrar búsqueda
            </h4>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
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
            </div>

            <button className="btn btn-primary my-5">Buscar por filtros</button>
          </div>
        </div>
      </form>
    </>
  );
};
