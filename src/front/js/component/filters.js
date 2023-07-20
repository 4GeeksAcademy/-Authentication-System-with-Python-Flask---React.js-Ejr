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
  const [selectedBrands, setSelectedBrands] = useState([]);


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
      brandsToShow = store.allBrands.slice(0, 59);
    } else if (vehicleType === "MOTO") {
      brandsToShow = store.allBrands.slice(59);
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
    const queryString = queryParams.join('&');
    const url = `${process.env.BACKEND_URL}api/search-by/filter?${queryString}`;

    try {
     const brand_id = selectedBrands.join(",")
     const vehicle_id = vehicleType
     actions.getFilteredProducts(brand_id, vehicle_id)
     } 
     catch(error) { (console.error('Error nuevo'))}

  }


  useEffect(() => {
    actions.getAllBrands()

  }, [])





  return (
    <>
      <a class="btn btn-primary jello-vertical buttonFilter" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
       
      <i class="fa-solid fa-sliders fa-beat"></i>
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
