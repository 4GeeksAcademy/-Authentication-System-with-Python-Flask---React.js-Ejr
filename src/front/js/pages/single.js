import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css";

export const Single = () => {
  const { store, actions } = useContext(Context);
  const [nroFoto, setNroFoto] = useState(0);
  const [elemento, setElemento] = useState(
    JSON.parse(localStorage.getItem("resp_element"))
  );

  const subeFoto = () => {
    if (nroFoto == elemento.fotos.length - 1) {
      setNroFoto(0);
    } else {
      setNroFoto(nroFoto + 1);
    }
  };
  const bajaFoto = () => {
    if (nroFoto == 0) {
      setNroFoto(elemento.fotos.length - 1);
    } else {
      setNroFoto(nroFoto - 1);
    }
  };

  return (
    <div
      className="contenedor-single container"
      style={{ height: "fit-content" }}
    >
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link to={"/dashboard"}>
            <div className="wrap d-flex">
              <div>{"<< Volver a Búsqueda de Propiedades"}</div>
            </div>
          </Link>
        </div>
      </nav>
      <div className="contenedor-carrusel container">
        {/* ------------------------------- INICIO CARRUSEL DE FOTOS ---------------------------------- */}

        {elemento.fotos.length == 0 ? (
          "Aviso no tiene fotos"
        ) : (
          <div className="text-center">
            <div
              className="foto img-fluid"
              style={{
                backgroundImage: `url(${elemento.fotos[nroFoto]})`,
              }}
            ></div>
            <div className="container leyenda-fotos mt-2 d-flex px-5">
              <div className="col-4 d-flex justify-content-end">
                {elemento.fotos.length > 1 ? (
                  <button
                    onClick={bajaFoto}
                    className="btn btn-primary btn-sm text-white"
                  >
                    {"<< Previa"}
                  </button>
                ) : (
                  ""
                )}
              </div>
              <div className="col-4  text-center ">
                {elemento.fotos.length > 1 ? (
                  <div>{`Foto ${nroFoto + 1}`}</div>
                ) : elemento.fotos.length == 1 ? (
                  <div>Foto única</div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-4 d-flex justify-content-start">
                {elemento.fotos.length > 1 ? (
                  <button
                    onClick={subeFoto}
                    className="btn btn-primary btn-sm text-white"
                  >
                    {"Seguir >>"}
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------- DESCRIPCION DEL INMUEBLE ---------------------------------- */}
      </div>
      <div className="contenedor-datos container">
        <div className="container p-5">
          <div className="datos-propiedad-arriba d-flex">
            <div className="datos-propiedad-izquierda col-8">
              <h2 className="card-title fw-bold pb-2">
                Descripción de la Propiedad:
              </h2>
              <h5 className="">{`Ubicación: ${elemento.tipo_vivienda} en ${
                elemento.direccion
              }, Municipio de ${
                elemento.municipio.charAt(0).toUpperCase() +
                elemento.municipio.slice(1)
              }`}</h5>
              <h5 className="">{`Provincia: ${elemento.provincia}`}</h5>
              <h5 className="">{`Comunidad Autónoma: ${elemento.comunidad}`}</h5>
              <h5 className="">{`Precio: ${elemento.precio} ${
                elemento.tipo_operacion != "compra" ? " Euros/mes" : "Euros"
              }`}</h5>
              <div className="características wrap pt-2">
                <h5 className="">Características:</h5>
                <h5 className="px-4">{`- Habitaciones: ${elemento.habitaciones}`}</h5>
                <h5 className="px-4">{`- Baños: ${elemento.aseos}`}</h5>
                {elemento.piscina ? <h5 className="px-4">- Piscina</h5> : ""}
                {elemento.terraza ? <h5 className="px-4">- Terraza</h5> : ""}
                {elemento.garage ? (
                  <h5 className="px-4">- Plaza de Garage</h5>
                ) : (
                  ""
                )}
                {elemento.pet ? (
                  <h5 className="px-4">- Admite Mascotas</h5>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="ventana-mensajes col-4 border text-center pt-5">
              AQUI LA VENTANA DE ENVIO DE MENSAJES
            </div>
          </div>
          <div className="datos-propiedad-abajo">
            <h5 className="card-text pt-4" style={{ textJustify: "justify" }}>
              {`Información del Propietario: ${elemento.descripcion}`}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
