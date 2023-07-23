import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import "../../styles/filters.css";
import { Placeholder_carousel } from "../pages/placeholder_carousel";

export const SearchResults = (props) => {
  const { store, actions } = useContext(Context);
  const carImage = "https://images.coches.com/_vn_/kia/Sportage/c399cf1d98a95d24f8e8715dd0b13fb2.jpg?p=cc_vn_high"

  useEffect(() => {
    actions.getFilteredProducts()

  },[])
  console.log(store.filterProducts)
  return (
    <div className="container">
    <div className="d-flex overflow-auto my-5">
      {store.filterProducts.length > 0 ? (
        <div className="d-flex overflow-auto my-5">
          {store.filterProducts.map((vehicle, index) => (
            <div className="col-12 col-md-4 card-item" key={index}> 
              <div className="card" style={{ width: "18rem" }}>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img src={carImage} className="card-img-top imgCarousel" alt="..." />
                    </div>
                    <div className="flip-card-back">
                      <Link to="/login" style={{ color: "white", textDecoration: "none" }} className="link-hover">
                        <h3 className="pt-2">{vehicle.name}</h3>
                      </Link>
                      <p>Matriculación: {vehicle.year}</p>
                      <p>Estado: {vehicle.state}</p>
                      <p>{vehicle.km} km</p>
                      <p>{vehicle.fuel}</p>
                    </div>
                  </div>
                </div>
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <Link to="/login" style={{ color: "black", textDecoration: "none" }} className="link-hover">
                      <h5 className="card-title justify-content-start d-flex" id="vehicleCardTittle">
                        <strong>
                          {vehicle.name.length >= 25 ? vehicle.name.slice(0, 19) + "..." : vehicle.name}</strong>
                      </h5>
                    </Link>
                    <h5 className="card-title justify-content-start d-flex">20.000€</h5>
                    <p>
                      Vendido por{" "}
                      <Link
                        to={!store.token ? "/login" : "/profile"}
                        style={{ color: "black", textDecoration: "none" }}
                        className="link-hover"
                      >
                        {vehicle.user_full_name}
                      </Link>
                    </p>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Link id="heartCard" to="/profile/favorites" onClick={() => selectFavoriteVehicle(vehicle.id)}>
                      <script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
                      <lord-icon
                        src="https://cdn.lordicon.com/rjzlnunf.json"
                        trigger="hover"
                        colors="primary:#1663c7,secondary:#16a9c7"
                        stroke="80"
                        style={{ width: "50px", height: "30px" }}
                      ></lord-icon>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
      ) : (
        <div className="d-flex justify-content-center m-auto" >
          <h3 className="my-5">
            <strong>
              No hemos encontrado resultados con estos filtros. Prueba a utilizar otros parámetros.
            </strong>
          </h3>
        </div>
      )}
    </div>
    </div>
  );
};
