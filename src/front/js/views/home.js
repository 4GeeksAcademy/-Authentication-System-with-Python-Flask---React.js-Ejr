import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  // getProjects: () => {
  //   fetch("https://3001-xetnal-finalproject-s0srryejroy.ws-us45.gitpod.io/api/projects")
  //     .then((response) => response.json())
  //     .then((data) => {console.log(data);
  //     setStore({ projects: data })
  //   })
  // }

  return (
    <>
      <div className="container my-3">
        <h1 className="text-center">¡Atrevete a invertir ahora!</h1>
        <div className="row">
          <div className="col-md-12">
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
        </div>
        <h2 className="my-5 text-center">Oportunidades mas recientes:</h2>
        <div className="row text-center my-5">
          <div className="cardContainer d-flex justify-content-around my-5">
            <div className="card  col-sm-12" style={{ width: "18rem" }}>
              <img
                src="https://wp.zillowstatic.com/1/LA-5977f6.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Direccion</h5>
                <p className="card-text">Empresa</p>
                <p className="card-text">Xm2</p>
                <p className="card-text">Precio</p>

                <a href="#" className="btn btn-dark">
                  Ver mas!
                </a>
              </div>
            </div>
            <div className="card  col-sm-12" style={{ width: "18rem" }}>
              <img
                src="https://fazewp-fazemediainc.netdna-ssl.com/cms/wp-content/uploads/2021/08/new-apartment-2.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Direccion</h5>
                <p className="card-text">Empresa</p>
                <p className="card-text">m2</p>
                <p className="card-text">Precio</p>

                <a href="#" className="btn btn-dark">
                  Ver mas!
                </a>
              </div>
            </div>
            <div className="card text-white bg-dark col-sm-12" style={{ width: "18rem" }}>
              <img
                src="https://res.akamaized.net/domain/image/upload/t_web/c_fill,w_1200,h_630/v1543188978/Dom-oct27m-ModernHomes-04_jpg_ia23ii.jpg"
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Direccion</h5>
                <p className="card-text">Empresa</p>
                <p className="card-text">Xm2</p>
                <p className="card-text">Precio</p>

                <a href="#" className="btn btn-light">
                  Ver mas!
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
