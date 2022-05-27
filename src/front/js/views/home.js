import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import 'animate.css';


export const Home = () => {
  const { store, actions } = useContext(Context);

  // getProjects: () => {
  //   fetch("https://3001-xetnal-finalproject-s0srryejroy.ws-us45.gitpod.io/api/projects")
  //     .then((response) => response.json())
  //     .then((data) => {console.log(data);
  //     setStore({ projects: data })
  //   })
  // }
  useEffect(() => {
    actions.getLatestProjects();
    console.log(store.latestProjects);
  }, []);

  return (
    <>
      <div className="container my-3 ">
        <h1 className="animate__animated animate__fadeInRightBig text-center ">¡Atrevete a invertir ahora!</h1>
        <div className="row ">
          <div className="col-md-12 ">
            <div
              id="carouselExampleFade"
              className=" carousel slide carousel-fade "
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
          {store.latestProjects?.map((proyecto) => {
            return (
              <>
                <div className="animate__animated animate__fadeInRightBig col">
                  <div
                    className="card text-white bg-dark col-sm-12"
                    style={{ width: "18rem" }}
                  >
                    <img
                      src={proyecto.pictures}
                      className="card-img-top proyecto-picture"
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">{proyecto.title}</h5>
                      <p className="card-text">{proyecto.address}</p>
                      <p className="card-text">Desde {proyecto.size}m2</p>
                      <p className="card-text">
                        Desde {proyecto.total_price} UF
                      </p>

                      
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          </div>
        </div>
      </div>
    </>
  );
};
