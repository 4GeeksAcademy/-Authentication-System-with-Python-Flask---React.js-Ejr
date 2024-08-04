import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container text-center my-5">
      <div className="row">
        <div className="col">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="https://picsum.photos/600/400" className="d-block w-100 rounded" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://picsum.photos/600/400" className="d-block w-100 rounded" alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://picsum.photos/600/400" className="d-block w-100 rounded" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col order-5">
          Second in DOM, with a larger order
        </div>
      </div>
    </div>
  );
};
