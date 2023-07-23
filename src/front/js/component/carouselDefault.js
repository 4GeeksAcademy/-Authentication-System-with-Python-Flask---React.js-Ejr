import React, {useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ThemeContext } from "../layout";
import { useNavigate } from "react-router-dom";
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';
import { Filters } from "./filters";
import "/workspaces/Watacar_v2/src/front/styles/index.css";
import { Placeholder_carousel } from "../pages/placeholder_carousel";



export const CarouselDefault = () => {
  defineElement(lottie.loadAnimation);
  const { store, actions } = useContext(Context);
  const carImage = "https://images.coches.com/_vn_/kia/Sportage/c399cf1d98a95d24f8e8715dd0b13fb2.jpg?p=cc_vn_high"
  const navigate = useNavigate();

  useEffect(() => {
    actions.getAllProducts();
  }, []);

  const selectFavoriteVehicle = (user_id, product_id) => {
    actions.postFavorite(user_id, product_id);
  };

  return (
    <div className="d-flex overflow-auto my-5 ">
    {store.products.length > 0 ? (
      store.products.map((vehicle, index) => (
        <div className="mx-3 mb-5" key={index}>
          <div className="card card-blur" style={{ width: "18rem" }}>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  {/* Update the rendering to show the first image of the vehicle */}
                  {vehicle.images.length > 0 ? (
                    <img src={vehicle.images[0].image} className="card-img-top imgCarousel" alt="..." />
                  ) : (
                    <img src={carImage} className="card-img-top imgCarousel" alt="..." />
                  )}
                </div>
                <div className="flip-card-back">
                    <Link to={`product/${vehicle.id}`}  style={{ color: 'white', textDecoration: 'none' }} className="link-hover">
                      <h3 className="pt-2">{vehicle.brand.name}</h3>
                    <p>Matriculación: {vehicle.year}</p>
                    <p>Estado: {vehicle.state}</p>
                    <p>{vehicle.km} km</p>
                    <p>{vehicle.fuel}</p>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-body d-flex justify-content-between">
                <div>
                  <Link to={`/product/${vehicle.id}`} style={{ color: 'black', textDecoration: 'none' }} className="link-hover">
                    <h5 className="card-title justify-content-start d-flex" id="vehicleCardTittle">
                    {vehicle.name.length >= 25 ? vehicle.name.slice(0, 24) + "..." : vehicle.name}
                    </h5>
                  </Link>
                  <h5 className="card-title justify-content-start d-flex">{vehicle.price} €</h5>
                  <p>
                    Vendido por{" "}
                    <span
                      
                      style={{ color: 'black', textDecoration: 'none' }}
                      className="link-hover"
                    >
                      {vehicle.user_full_name}
                    </span>
                  </p>
                </div>
                <div className="d-flex justify-content-end">
                  <Link
                    id="heartCard"
                    to=""
                    onClick={() => selectFavoriteVehicle(store.user.id, vehicle.id)}
                  >
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
        ))
      ) : (
        <Placeholder_carousel/ >
      )}
    </div>
  );
};
