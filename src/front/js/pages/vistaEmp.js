import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { CardsInflu } from "../component/cardsInfluencers";
import { Headervistaempresa } from "../component/headervistaempresa";

export const VistaEmp = () => {
  return (
    <div>
      <Headervistaempresa />
      <div className="container">
        {/* ------------------------ */}
        <br></br>
        {/* ------------------------ */}
        <div
          className="row container"
          style={{
            display: "flex",
            justifyContent: "right",
            alignItems: "right",
            marginTop: "5px",
          }}
        >
          <div
            class="btn-group"
            style={{ height: "40px", width: "40px", marginRight: "100px" }}
          >
            {/* <button type="button" class="btn btn-light"><i class="fas fa-home"><a class="dropdown-item" href={"/vistaInflu"}></a></i></button> */}
            <button
              type="button"
              class="btn btn-warning dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-user-edit"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href={"/formulario-empresas"}>
                  Editar Perfil
                </a>
              </li>
              {/* <li><a class="dropdown-item" href="/">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li> */}
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* ----------------------------------------------------------------------------------- */}
        <div className="container" style={{ maxWidth: "1000px" }}>
          <div className="row container">
            <div
              className="col-md-7"
              style={{ paddingLeft: "15px", textAlign: "right" }}
            >
              <h1 className="title1" style={{ color: "#302880" }}>
                Nombre de la Empresa
              </h1>
              <h4 className="title1 ">Sector al que pertenece</h4>
              <h6 className="title1 ">Eslogan</h6>
              <h5 className="title1 ">Provincia (Ciudad)</h5>
              <br></br>
              <br></br>
              <h6
                className="title1 "
                style={{ opacity: "40%", maxWidth: "100%" }}
              >
                Breve descripción sobre la empresa, escrito por ella misma,
                puede introducir actitudes, aptitudes y logros.
              </h6>
            </div>
            <div
              className="col-md-5"
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <img
                src={
                  "https://brandemia.org/sites/default/files/inline/images/zara_nuevo_logo.jpg"
                }
                style={{
                  maxWidth: "300px",
                  opacity: "80%",
                  transform: "revert",
                }}
              />
            </div>
          </div>
          {/* ------------------------ */}
          <br></br>
          <br></br>
          {/* ------------------------ */}

          <h1 className="tituloabout" style={{ textAlign: "center" }}>
            INFLUENCERS FAVORITOS{" "}
          </h1>

          {/* ------------------------ */}
          <br></br>
          <br></br>
          {/* ------------------------ */}
          <div className="row container">
            <div className="row ">
              {/* {store.favInf?.map((e, i) => {
                        return (
                            <div key={i} className="col-4">
                                <CardsInflu name={e}
                                />
                            </div>
                        );
                    })} */}
              <di className="col-md-4">
                <CardsInflu />
              </di>
              <di className="col-md-4">
                <CardsInflu />
              </di>
              <di className="col-md-4">
                <CardsInflu />
              </di>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
      </div>
    </div>
  );
};
