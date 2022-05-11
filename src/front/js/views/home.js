import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="container my-3">
        <div className="row">
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://cdn.pixabay.com/photo/2018/07/27/00/32/apartment-3564955_960_720.jpg"
                  className="d-block w-100 carouselImg"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  c
                  src="https://cdn.pixabay.com/photo/2016/08/23/22/11/building-1615676_960_720.jpg"
                  className="d-block w-100 carouselImg"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <img
                  src="https://cdn.pixabay.com/photo/2017/10/06/04/33/new-housing-development-2821969_960_720.jpg"
                  className="d-block w-100 carouselImg"
                  alt="..."
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleFade"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="row text-center my-5">
          <h1>¡Atrevete a invertir ahora!</h1>
        </div>
      </div>
    </>
  );
};
<img src="https://cdn.pixabay.com/photo/2018/07/27/00/32/apartment-3564955_960_720.jpg" />;
